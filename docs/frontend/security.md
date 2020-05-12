> 什么是 CSRF 攻击，如何防护

CSRF(Cross-Site Request Forgery) 跨站请求伪造
黑客利用浏览器存储用户Cookie这一特性，来模拟用户发起一次带有认证信息的请求，比如转账、修改密码等。

防护：在这些需要认证信息的请求中，加入一些黑客无法得到的参数信息，比如 CSRFToken 或者独立的支付密码

> 什么是 SSRF 攻击，如何防护

SSRF(Server Side Request Forgery) 服务端请求伪造
黑客利用服务器代理请求功能，提交一个内网URL，就能让服务器代替黑客去访问内网，因为服务器是有访问的权限的，所以内网数据就展示给黑客了，
这也是常说的“内网穿透”。通过SSRF，黑客可以实现内网探测和文件读取

防护：白名单限制、协议限制和请求端限制