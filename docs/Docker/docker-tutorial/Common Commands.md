---
sidebar_position: 6
---

# Common Commands

# **Command Introduction**

## **Basic Commands:**

- **`pwd`**: Display the current working directory.
- **`touch`**: Create a file.
    - Example: **`touch file.txt`** creates a file named **`file.txt`** in the current directory.
- **`mkdir`**, **`rmdir`**: Create, remove directories.
    - **`mkdir newdir`**: Creates a new directory named **`newdir`**.
    - **`rmdir emptydir`**: Deletes an empty directory named **`emptydir`**.
- **`ls`**: List the contents of the current directory.
    - Example: **`ls -l`** lists all files and directories (excluding hidden files) in the current directory in long format, including permissions, owner, group, modification time, etc.
    - Example: **`ls -a`** lists all files, including hidden files (files starting with **`.`**).
    - ls -lhrtai
    - ls -l -h -r -t -a
- **`cd`**: Change directory, enter a specified directory.
    - Example: **`cd ./newdir`** changes from the current directory to **`newdir`** directory.
    - Example: **`cd ..`** goes back to the parent directory.
- **`cat`**, **`more`**, **`less`, `head`**, **`tail`**: View file contents.
    - Example: **`cat file.txt`** displays the entire content of **`file.txt`**.
    - Example: **`head -n 5 file.txt`** displays the first 5 lines of **`file.txt`**.
    - Example: **`less file.txt`** displays the file **`file.txt`** in a paginated manner, allowing for scrolling up and down.
    - Example: **`tail -n 3 file.txt`** displays the last 3 lines of **`file.txt`**.
- **`cp`**, **`mv`**, **`rm`**: Copy, move, delete files.
    - Example: **`cp source.txt destination.txt`** copies **`source.txt`** to **`destination.txt`**.
    - Example: **`mv oldname.txt newname.txt`** renames **`oldname.txt`** to **`newname.txt`**.
    - Example: **`rm file.txt`** deletes the file **`file.txt`**.
- **`chmod`**, **`chown`**: Modify file permissions.
    - **`chmod 755 script.sh`** sets the permissions of **`script.sh`** to read, write, and execute for the owner, and read and execute for the group and others.
    - **`chown user:group file.txt`** changes the owner of **`file.txt`** to **`user`** and the group to **`group`**.
    - chown allenshi:allenshi test.txt

## **Advanced Commands:**

- **`grep`**: Text search.
    - **`grep "error" logfile.log`** searches for lines containing "error" in **`logfile.log`**.
    - `ls -lhrt | grep -i error` ignore upper and lower case
- **`tar`**: File compression.
    - tar -zcvf usr.tgz usr/
    - tar -zxvf usr.tgz
    - .tar.zg
- `apt-get install` : Install package on Debian, Ubuntu
    - apt-get install curl: Install curl
- **`wget`**, **`curl`**: Download files or make requests to web servers.
