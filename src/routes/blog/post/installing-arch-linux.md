---
title: Installing Arch Linux
description: A collection of commands to install Arch Linux, with full disk encryption and Secure Boot.
date: Jan 24, 2022
categories:
  - wiki
  - arch
---

Over the summer I decided to learn more about Linux and Operating Systems, so I began my journey by learning to install
Arch Linux with full disk encryption and Secure Boot. I learnt heavily using the Arch Linux Wiki and am grateful for all
the volunteers who took the time to write it. If you'd like to learn more about this process, I'd encourage you start
from their [Installation Guide](https://wiki.archlinux.org/title/Installation_guide). This post is meant to be a
collection of commands you can refer to rather than a detailed explanation of how and why everything works.

First, we get the [monthly Arch Linux ISO](https://archlinux.org/download/) and make a bootable USB using something
like [Rufus](https://rufus.ie/). After disabling secure boot and booting into the USB, we begin by wiping our disk and
filling it with zeros.

### Wipe Disk

I use `/dev/nvme[...]` because the laptop I was installing Arch on contains an NVMe drive, but you might need to
use `/dev/sda[...]` or something else depending on what storage device you have. You can check which devices and
partitions you have with `lsblk`.

1. Let's create an encrypted container so that we can wipe the contents of the container:

   ```
   # cryptsetup open --type plain -d /dev/urandom /dev/nvmen0n1 wipe
   ```

2. Fill container with zeros to ensure nothing can be recovered:

   ```
   # dd if=/dev/zero of=/dev/mapper/wipe status=progress
   ```

3. Close the encrypted container:
   ```
   # cryptsetup close wipe
   ```

### Create Partitions and Logical Volumes

Now that we're done wiping the disk, we can move on to creating partitions and logical and physical volumes for boot,
swap, home directory and so on. Note that you need not replicate logical volumes as I have them exactly. For example, I
chose to create a logical volume for my `/home` directory, whereas you may choose not to do so.

1. Create 1M `ef02` partition (for legacy backwards compatability just in case we need it in the future), 1G `ef00`
   partition (for boot files) and the rest of the space as a `8309` partition (for OS and user files)
   using `gdisk /dev/nvmen0n1`.

2. Create LUKS2 encrypted container: (since GRUB2 doesn't support LUKS2 at the time of writing, we'll be
   using `systemd-boot` -- it also makes secure booting easier)

```
# cryptsetup luksFormat --type luks2 --cipher aes-xts-plain64 --hash sha512 --verify-passphrase /dev/nvme0n1p3
```

3. Open the encrypted container so that we can create physical and logical volumes:

```
# cryptsetup luksOpen /dev/nvme0n1p3 cryptlvm
```

4. Create a physical volume on top of the opened LUKS container:

```
# pvcreate /dev/mapper/cryptlvm
```

5. Create a volume group in the physical volume:

```
# vgcreate vg_00 /dev/mapper/cryptlvm
```

6. Create logical volumes for swap, root and home on the volume group:

```
# lvcreate -L 8G vg_00 -n lv_00_swap
# lvcreate -L 40G vg_00 -n lv_01_root
# lvcreate -l 100%FREE vg_00 -n lv_02_home
```

7. Format filesystems: (partition 2 will be a FAT32 filesystem, and EXT4 for root and home directories)

```
# mkfs.fat -F 32 /dev/nvmen0n1p2
# mkfs.ext4 /dev/mapper/vg_00-lv_01_root
# mkfs.ext4 /dev/mapper/vg_00-lv_02_home
# mkswap /dev/mapper/vg_00-lv_00_swap
```

8. Mount your filesystems:

```
# mount /dev/mapper/vg_00-lv_01_root /mnt
# swapon /dev/mapper/vg_00-lv_00_swap
# mkdir /mnt/efi
# mkdir /mnt/home
# mount /dev/nvmen0n1p2 /mnt/efi
# mount /dev/mapper/vg_00-lv_02_home /mnt/home
```

### Install Arch Linux

Now that partitions have been created, we can proceed to installing packages and performing other tasks to get our
system ready so that we can boot into it.

1. Connect to internet (use `iwctl` if you're on WiFi).

2. Install essential packages:
   - `lvm2` is required since we will use it in a mkinitcpio hook to open our encrypted container.
   - `vim` is required to edit files.
   - `networkmanager` is required to manage Ethernet and WiFi connections. I'm picking this mainly because it's tried
     and tested and because it supposedly has easy-to-configure applet for use in window managers.
   - `intel-ucode` is microcode updates for Intel CPUs. You should install `amd-ucode` if you have an AMD CPU.

```
# pacstrap /mnt base base-devel linux linux-firmware lvm2 vim networkmanager intel-ucode git
```

2. Generate fstab file:

```
# genfstab -U /mnt >> /mnt/etc/fstab
```

3. Change root into new system:

```
# arch-chroot /mnt
```

4. Set timezone and sync it:

```
# ln -sf /usr/share/zoneinfo/<Region>/<City> /etc/localtime
# hwclock --systohc # generates /etc/adjtime
# timedatectl set-ntp true
```

5. Configure Localization:

   - Edit `/etc/locale.gen` and uncomment `en_US.UTF-8 UTF-8` for US English with UTF-8.
   - Generate locales and set it:

   ```bash
   $ locale-gen
   $ echo "LANG=en_US.UTF-8" >> /etc/locale.conf
   ```

6. Set hostname:

   ```bash
   $ echo "arch" >> /etc/hostname
   ```

7. Add entries to `/etc/hosts`:

   ```
   127.0.0.1	localhost
   ::1			localhost
   127.0.1.1	arch.localdomain	arch
   ```

8. Generate Initramfs

   - Add the `keyboard`, `keymap`, `encrypt` and `lvm2` hooks to `/etc/mkinitcpio.conf`: (ordering matters)

   ```
   HOOKS=(base udev autodetect keyboard keymap modconf block encrypt lvm2 filesystems resume fsck)
   ```

   - Recreate the initramfs image to ensure your configuration is correct:

   ```
   # mkinitcpio -P
   ```

9. Set the root password

```
# passwd
```

10. Create your user and give access to privilege escalation

```
# useradd -mG wheel ark
# passwd ark
# EDITOR=vim visudo
```

The last command brings up an editor. Uncomment this line:

```
%wheel ALL=(ALL) ALL
```

11. Install yay to make it easier to install packages from the [AUR](https://aur.archlinux.org/):

```
# sudo su ark
$ cd ~
$ git clone https://aur.archlinux.org/yay.git
$ cd yay
$ makepkg -si
$ sudo pacman -R $(pacman -Qdtq)
$ cd ..
$ rm -rf yay
$ yay --sudoloop --save
$ exit
```

11. Install a Bootloader

- Install `systemd-boot`

```bash
$ bootctl install --esp-path=/efi
```

- Create `/efi/loader/entries/arch.conf`: (used only once for first boot)

```
title	Arch Linux
linux	/vmlinuz-linux
initrd	/intel-ucode.img
initrd	/initramfs-linux.img
options	cryptdevice=UUID=<device-UUID>:cryptlvm root=/dev/mapper/vg_00-lv_01_root resume=/dev/mapper/vg_00-lv_00_swap splash rw"
```

Use `blkid` and replace `<device-UUID>` with `/dev/nvme0n1p3`'s UUID.

12. Copy all the files in `/boot` into `/efi`. This is temporary just so we can get the first boot working.

13. Edit `/etc/inputrc` to uncomment `set bell-style none` to get rid of the annoying bell sound on tab completion.

14. Reboot (`exit` and `reboot`) the system.

15. Ensure to enter setup mode in BIOS settings (by clearing/choosing to import keys) and then boot into Arch.

16. You should now have a working Arch install. Let's get to work enabling secure boot.

### Post-Install

1. Login as `root`, and delete `vmlinuz-linux`, `*.img` from `/efi`.

2. Delete `/efi/loader/entries/arch.conf`. Or you may back it up by renaming it to `/efi/loader/entries/arch.conf.bak`.

3. Connect yourself to the internet: (use `nm-ctl` if you're on WiFi)

```
# systemctl enable NetworkManager.service
# systemctl start NetworkManager.service
```

4. Install `sbctl` to make signing files and managing secure boot keys easy:

```
# sudo su ark # we don't want to run yay as root
$ yay -S sbctl-git
$ exit
```

5. Create and enroll keys required for secure boot: (Use the `--microsoft` flag only if there are option ROMs in the
   bootchain that are signed by Microsoft's keys)

```
# sbctl create-keys
# sbctl enroll-keys --microsoft
```

6. Create EFI Stub: (No need to add an entry for this, as `systemd-boot` will automatically generate an entry)

```
# sbctl bundle -s \
  --efi-stub /usr/lib/systemd/boot/efi/linuxx64.efi.stub \
  --splash-img /usr/share/systemd/bootctl/splash-arch.bmp \
  --cmdline /proc/cmdline \
  --os-release /usr/lib/os-release \
  --kernel-img /boot/vmlinuz-linux \
  --initramfs /boot/initramfs-linux.img \
  --intelucode /boot/intel-ucode.img \
  /efi/EFI/Linux/linux-signed.efi
```

7. Sign relevant files: (In the future, files will be automatically signed with
   the `/usr/share/libalpm/hooks/99-sbctl.hook` pacman hook)

```
# sbctl sign -s /efi/EFI/BOOT/BOOTX64.EFI
# sbctl sign -s /efi/EFI/Linux/linux-signed.efi
# sbctl sign -s /efi/EFI/systemd/systemd-bootx64.efi
```

8. We can restart now and enable secure boot. We successfully boot if everything is signed correctly.

9. Enable SSD trimming (if you have an SSD)

```
$ sudo pacman -S util-linux
$ sudo systemctl enable fstrim.timer
$ sudo systemctl start fstrim.timer
```

And that's it. I had a particularly difficult time getting secure boot to work, but figured it out in the end. Now I
definitely know way more about secure boot than ever before. I mainly wanted to get secure boot working to protect from
evil maid attacks since that attack defeats the purpose of full disk encryption without a protected boot process.
