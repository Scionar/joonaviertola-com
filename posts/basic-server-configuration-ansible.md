---
title: "Basic server configuration Ansible"
description: "Step by step tutorial how to use Ansible"
date: "2017-06-01"
---

"Ansible is an open-source automation engine that automates software provisioning, configuration management, and application deployment." -[Wikipedia](<https://en.wikipedia.org/wiki/Ansible_(software)>)

Although Ansible is trying to be simple to use, I bet people will spend time with it's documentation too much. I just made a provision project with Ansible and made a Github repository for it, [Ansible wifi router](https://github.com/Scionar/ansible-wifi-router). I have used Ansible before but this was first time I started from the beginning and not just trying to fix problems in other repositories.

Here is little tips and tricks how to get to start.

## Task snippets

Main usage with Ansible has been installing software with package manager and configure it. Ansible comes with multiple modules for this.

### Install software

Use `with_items` with `apt` to install multiple software.

```yaml
- name: Install software with APT package manager
  apt: name={{item}} state=installed
  with_items:
    - hostapd
    - isc-dhcp-server
```

### Comment line in file

`Lineinfile` is really useful with regular expression. Notice that in this example, if line is not found and commented, line is added to end of the file.

```yaml
- name: Comment line in dhcpd.conf
  lineinfile:
    dest: /etc/dhcp/dhcpd.conf
    regexp: "^(#?option domain-name )"
    line: "#option domain-name "
```

### Change line value

You can also change line value with `lineinfile`. Just notice that regular expression must still match the line. In this snippet I have defined only needed beginning of line.

```yaml
- name: Change line value
  lineinfile:
    dest: /etc/default/isc-dhcp-server
    regexp: '^(#?INTERFACES=")'
    line: 'INTERFACES="{{interface_in}}"'
```

### Insert a template

Easy way to set configuration is templates. Create a template which will replace the configuration file. Templates can also use variables from inventories.

```yaml
- name: Insert hostapd.conf.j2 template
  template:
    src: templates/hostapd.conf.j2
    dest: /etc/hostapd/hostapd.conf
    owner: root
    group: root
    mode: 0644
```

Template file hostapd.conf.j2:

```
ssid={{ssid}}
wpa_passphrase={{passphrase}}
```

### Command

If you do not find an ansible-way to do stuff, just do shell commands with Ansible.

```yaml
- name: Run command
    command: sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"
```
