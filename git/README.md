#如何同时使用两个git账户
- generate ssh key
```
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
```
- 存在 ~/.ssh 目录下

- 添加config文件
```
Host ekuaibao
     HostName git.ekuaibao.com
     User zhangxingbo
     IdentityFile ~/.ssh/id_rsa

Host github.com
     HostName github.com
     User xingDev
     IdentityFile ~/.ssh/id_rsa_xingDev
```

- 清空 known_hosts

- 验证

```
ssh -T git@ekuaibao
ssh -T git@github.com
```