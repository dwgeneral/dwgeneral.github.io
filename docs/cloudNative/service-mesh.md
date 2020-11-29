**什么是 Service Mesh**

Service Mesh 一句话描述：是微服务时代的TCP协议

**什么是 微服务**

是一种软件架构风格，它是以专注于单一职责与功能的小型功能区块为基础，利用模块化的方式组合出复杂的大型应用程序，各功能区块使用与语言无关的API集相互通信

**Service Mesh 是如何发展出来的**
- 原始通信时代，各个服务实现中，除了业务逻辑外，还夹杂着对网络传输问题的处理逻辑

    ![1](../assets/service_mesh/1.png ':size=525x314')

- TCP 时代，将网络传输处理逻辑抽离出来，并下移为操作系统网络层的一部分

    ![2](../assets/service_mesh/2.png ':size=492x314')

- 第一代微服务，TCP出现之后，分布式系统蓬勃发展，分布式系统特有的通信语义又出现了，如熔断策略、负载均衡、服务发现，认证授权等等，于是服务中除了业务逻辑，还实现了这部分的逻辑

    ![3](../assets/service_mesh/3.png ':size=469x372')

- 第二代微服务，为了避免每个服务都需要自己实现一套分布式系统通信语义功能，一些微服务开发框架出现了，如Twitter的finagle, FB的Proxygen以及SpringCloud，这些框架实现了分布式系统通信需要的各种通用语义功能

    ![4](../assets/service_mesh/4.png ':size=484x387')

- 第一代 Service Mesh
    - 第二代微服务看似完美，但开发人员很快发现，它存在一些本质问题
        - 一，虽然框架本身屏蔽了分布式系统通信的一些通用功能实现细节，但开发者却要花更多精力去掌握和管理复杂的框架本身，这很难
        - 二，开发框架通常只支持一种或几种特定的语言，回过头来看文章最开始对微服务的定义，一个重要特性就是语言无关，但那些没有框架支持的语言编写的服务，很难融入
        - 三，框架以lib库的形式进行服务，复杂项目依赖时的库版本兼容问题非常棘手，同时，框架库的升级也无法对服务透明，服务会因为和业务无关的lib库升级而被迫升级
    - 因此以 Linkerd，Envoy，Ngixmesh 为代表的代理模式(边车模式)应运而生，这就是第一代 Service Mesh，它将分布式服务的通信抽象为单独一层，在这一层中实现负载均衡、服务发现、认证授权、监控追踪、流量控制等分布式系统所需的功能，作为一个和服务对等的代理服务，和服务部署在一起，接管服务的流量，通过代理之间的通信间接完成服务之间的通信请求，这样上边所说的三个问题也迎刃而解

    ![5](../assets/service_mesh/5.png ':size=609x297')

    ![6](../assets/service_mesh/6.png ':size=609x673')

- 第二代 Service Mesh
    - 第一代 Service Mesh 由一系列独立运行的单机代理服务构成，为了提供统一的上层运维入口，演化出了集中式的控制面板，所有的单机代理组件通过和控制面板交互进行网络拓扑策略的更新和单机数据的汇报，这就是以 Istio 为代表的第二代 Service Mesh

    ![7](../assets/service_mesh/7.png ':size=609x391')

    ![8](../assets/service_mesh/8.png ':size=609x325')

**现在，我们再来看下ServiceMesh这个词的发明人，对ServiceMesh的定义**

服务网格是一个基础设施层，用于处理服务间通信，云原生应用有着复杂的服务拓扑，服务网格保证请求在这些拓扑中可靠地穿梭。在实际应用当中，服务网格通常是由一系列轻量级的网络代理组成的，它们与应用程序部署在一起，但对应用程序透明。

**总结一下，Service Mesh 有以下优点，也面临以下挑战**

- 优点
    - 屏蔽分布式系统通信的复杂性，服务只用关注业务逻辑
    - 真正的语言无关，服务可以用任何语言编写，只需和ServiceMesh通信即可
    - 对应用透明，ServiceMesh组件可以单独管理、升级
- 面临挑战
    - ServiceMesh组件以代理模式计算并转发请求，一定程度上会降低通信系统性能，并增加系统资源开销
    - ServiceMesh组件接管了网络流量，因此服务的整体稳定性依赖于ServiceMesh，同时额外引入的大量ServiceMesh服务实例的运维和管理也是一个挑战

历史总是惊人的相似，为了解决端到端的字节码通信问题，TCP协议诞生，让多机通信变得简单可靠；微服务时代，ServiceMesh应运而生，屏蔽了分布式系统的诸多复杂性，让开发者可以回归业务，聚焦真正的价值