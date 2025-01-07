# Linux Introduction

# About Linux

## History

[https://zh.wikipedia.org/zh-tw/Linux历史](https://zh.wikipedia.org/zh-tw/Linux%E5%8E%86%E5%8F%B2)

## Distribution

[https://zh.wikipedia.org/zh-tw/Linux发行版列表](https://zh.wikipedia.org/zh-tw/Linux%E5%8F%91%E8%A1%8C%E7%89%88%E5%88%97%E8%A1%A8)

# Linux File System

## Directory Structure

### Tree Structure

### Root Directory (/)

The top level of the file system, under which all other files and directories exist.

### System Directories

- **/bin：** Contains binary executable files of basic user commands, such as **`ls`, `cp`,** etc.
- **/etc：** Contains system configuration files.
- **/home：** Contains the home directories of ordinary users, with each user having a directory named after their username.
- **/usr：** Contains user applications and files.
- **/var：** Contains files that frequently change, such as logs, mail queues, etc.
- **/tmp：** Contains temporary files, which may be cleared upon system reboot.
- **/lib：** Contains shared libraries and kernel modules needed for system calls.
- **/boot：** Contains files needed to boot Linux, such as the kernel and boot loader.
- **/dev：** Contains device files. Linux treats devices as files, and this is where they are represented.
- **/proc：** A virtual filesystem that provides system and process information, such as /proc/cpuinfo with CPU information.

### Home Directory (~)

Contains the home directories of ordinary users, with each user having a directory named after their username.

The home directory provides users with a segregated workspace, allowing them to work and manage their files without affecting other users

- **Characteristics**
    - **User Isolation:** Each user's home directory is independent. One user cannot access another user's home directory unless they have permissions.
    - **Personalized Settings:** Users can store personal settings in their home directory, such as shell configuration files (e.g., **`.bashrc`** and **`.profile`**), and configuration files for various applications (e.g., **`.vimrc`** and **`.gitconfig`**).
    - **Default Location:** Home directories are typically located at **`/home/username`** (for the root user, it's usually **`/root`**).
- Home Directory usage
    - **Accessing the Home Directory:** Users can access their home directory by entering **`cd ~`** or simply **`cd`** in the terminal.
    - **Configuring the Environment:** Users can customize the behavior of their shell environment and other applications by modifying configuration files (Personalized Settings mentioned above) in their home directory.
- Home Directory Management
    
    System administrators can manage users' home directories, including creating and deleting home directories, changing their permissions and ownership, and backing up and restoring data. Additionally, administrators can set quotas to limit the size of user home directories to prevent any single user from consuming too much disk space.
    

## Permission

```bash
root@89f59def9dc6:/# ls -lhrt
total 60K
drwxr-xr-x   2 root root 4.0K Jan 28 21:20 home
drwxr-xr-x   2 root root 4.0K Jan 28 21:20 boot
drwxr-xr-x   1 root root 4.0K Feb 11 00:00 var
drwxr-xr-x   1 root root 4.0K Feb 11 00:00 usr
drwxr-xr-x   2 root root 4.0K Feb 11 00:00 srv
drwxr-xr-x   2 root root 4.0K Feb 11 00:00 sbin
drwxr-xr-x   3 root root 4.0K Feb 11 00:00 run
drwxr-xr-x   2 root root 4.0K Feb 11 00:00 opt
drwxr-xr-x   2 root root 4.0K Feb 11 00:00 mnt
drwxr-xr-x   2 root root 4.0K Feb 11 00:00 media
drwxr-xr-x   1 root root 4.0K Feb 13 09:34 lib
drwxr-xr-x   1 root root 4.0K Feb 13 09:34 bin
drwxrwxrwt   1 root root 4.0K Feb 13 09:34 tmp
drwxr-xr-x   1 root root 4.0K Feb 28 08:24 etc
drwx------   1 root root 4.0K Feb 29 01:10 root
dr-xr-xr-x  12 root root    0 Mar  7 13:47 sys
dr-xr-xr-x 270 root root    0 Mar  7 13:47 proc
drwxr-xr-x   5 root root  360 Mar  7 13:47 dev
```

### File Permission

- r：Read 4
- w：Write 2
- x：Execute 1

### Permission User Type

| Symbolicnotation | Numericnotation |  |
| --- | --- | --- |
| `----------` | 0000 | no permissions |
| `-rwx------` | 0700 | read, write, & execute only for owner |
| `-rwxrwx---` | 0770 | read, write, & execute for owner and group |
| `-rwxrwxrwx` | 0777 | read, write, & execute for owner, group and others |
| `---x--x--x` | 0111 | execute |
| `--w--w--w-` | 0222 | write |
| `--wx-wx-wx` | 0333 | write & execute |
| `-r--r--r--` | 0444 | read |
| `-r-xr-xr-x` | 0555 | read & execute |
| `-rw-rw-rw-` | 0666 | read & write |
| `-rwxr-----` | 0740 | owner can read, write, & execute; group can only read; others have no permissions |

![Untitled](Linux%20Introduction%20ca7bac636b8a47b4a9d907ca697290fd/Untitled.png)

1. File type. d for directory and ‘-’ for file.
2. User permission.
3. Group permission.
4. Others’ permission.
5. Count of hard links.
6. Owner user.
7. Group.
8. Size.
9. Modification date.
10. File or directory name.