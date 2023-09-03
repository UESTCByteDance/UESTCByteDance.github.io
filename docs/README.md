## 一、项目介绍

> *简要介绍：本项目利用 Golang 以及相关技术如 Gorm、MySQL、Redis、JWT、RabbitMQ* *、Hystrix、七牛云**等构建了基于 Gin 和* *Go-micro的微服务应用，实现了视频处理、对象存储、限流、降级熔断、负载均衡等功能，并通过 Opentracing、Jaeger 等工具进行监控与追踪，Docker进行容器化部署，形成高可用高性能的分布式服务。*
>
> **项目服务地址**：http://47.113.223.86:8080
>
> **项目仓库地址**：[https://github.com/UESTCByteDance/ByteRhythm](https://github.com/UESTCByteDance/ByteRhythm)

## 二、项目分工

| **团队成员** | **主要贡献**                                          |
| ------------ | ----------------------------------------------------- |
| 王鑫耀       | v1版基础接口，v2版User模块、Video模块，测试、文档撰写 |
| 雷荃悠       | v1版社交接口，v2版Relation模块、Message模块、ppt制作  |
| 黄文彬       | v2版Favorite模块、Comment模块                         |
| 唐以恒       | v1版互动接口                                          |
| 黄绍波       | v1版社交接口                                          |
| 贺广胜       | ffmpeg，docker，部署项目                              |
| 江岸苧       | 测试，ppt制作                                         |
| 罗越         | 文档撰写                                              |

## 三、项目实现

### 3.1 技术选型与相关开发文档

> 问题和目标： 构建一个稳定、高效的视频分享平台，用户可以上传、观看、点赞视频内容，与好友聊天等，同时确保系统具备一定的扩展性和容错性。
>
> 前提假设：
>
> 1. 预计每天有大量的用户上传、观看和分享视频内容，需要支持高并发的访问。
> 2. 视频处理和上传至七牛云需要消耗一定的存储空间，所以预计需要一定的存储资源。
> 3. 系统需要考虑限流和负载均衡，以防止过多的请求影响系统稳定性。
> 4. 用户身份验证和授权需要使用 JWT 技术，确保用户数据的安全性。
> 5. 为了保障系统的可用性和容错性，采用了微服务架构，通过 Docker 进行容器化部署。
> 6. 为了监控和追踪系统性能，使用了 Opentracing 和 Jaeger 工具。
>
> 存储需求： 考虑到每天大量的视频上传和存储，以及用户数据的存储，预计需要存储空间5G，这些数据可以存放在分布式存储系统中，如七牛云、MySQL、Redis 等。如果考虑项目的部署运行，预计需要存储空间20G。
>
> 服务器需求： 根据高并发的需求和微服务架构，预计需要至少1台服务器。服务器用于部署不同的微服务模块，例如视频处理、用户认证、内容推荐等。
>
> 为了确保视频分享平台的稳定运行和用户满意度，还需要考虑其他方面的因素，如网络带宽、系统监控和故障处理等。综合考虑这些因素，可以建立一个高可用高性能的分布式服务，提供良好的用户体验。

### 3.2 架构设计

#### 3.2.1 服务模块划分

- Gin实现API网关，完成HTTP请求的转发。
- Go-micro实现微服务，处理具体的业务逻辑。

| 微服务          | 接口类别 | 用途                                                     |
| --------------- | -------- | -------------------------------------------------------- |
| UserService     | 基础接口 | 用户注册、用户登录、获取用户信息                         |
| VideoService    | 基础接口 | 获取视频流、发布视频，获取发布视频的列表                 |
| FavoriteService | 互动接口 | 视频点赞/取消点赞，获取喜欢视频的列表                    |
| CommentService  | 互动接口 | 视频评论，获取视频评论列表                               |
| RelationService | 社交接口 | 关注、取消关注、获取关注列表、获取粉丝列表、获取好友列表 |
| MessageService  | 社交接口 | 发送聊天消息，获取消息列表                               |

#### 3.2.2 架构设计图

![img](.vuepress\public\images\1693747834226-16.png)

#### 3.2.3 关系数据库设计

- user表

| 列名             | 数据类型  | 约束       | 索引              | 备注       |
| ---------------- | --------- | ---------- | ----------------- | ---------- |
| id               | uint      | 主键，自增 | idx_user_id       | 用户ID     |
| username         | string    | unique     | idx_user_username | 用户名     |
| password         | string    | 无         | 无                | 密码       |
| avatar           | string    | 无         | 无                | 用户头像   |
| background_image | string    | 无         | 无                | 背景图片   |
| signature        | string    | 无         | 无                | 用户签名   |
| created_at       | time.Time | 无         | 无                | 创建时间戳 |

- video表

| 列名       | 数据类型  | 约束       | 索引                | 备注       |
| ---------- | --------- | ---------- | ------------------- | ---------- |
| id         | uint      | 主键，自增 | 无                  | 用户ID     |
| author_id  | int       | 外键       | idx_video_author_id | 作者ID     |
| play_url   | string    | 无         | 无                  | 播放链接   |
| cover_url  | string    | 无         | 无                  | 封面链接   |
| title      | string    | 无         | 无                  | 视频标题   |
| created_at | time.Time | 无         | 无                  | 创建时间戳 |

- comment表

| 列名       | 数据类型     | 约束       | 索引                 | 备注       |
| ---------- | ------------ | ---------- | -------------------- | ---------- |
| id         | uint         | 主键，自增 | 无                   | 评论ID     |
| user_id    | int          | 外键       | 无                   | 用户ID     |
| video_id   | int          | 外键       | idx_comment_video_id | 视频ID     |
| content    | string(1024) | 无         | 无                   | 评论内容   |
| created_at | time.Time    | 无         | 无                   | 创建时间戳 |

- favorite表

| 列名       | 数据类型  | 约束       | 索引                             | 备注       |
| ---------- | --------- | ---------- | -------------------------------- | ---------- |
| id         | uint      | 主键，自增 | 无                               | 收藏记录ID |
| user_id    | int       | 外键       | idx_favorite                     | 用户ID     |
| video_id   | int       | 外键       | idx_favorite，idx_favorite_video | 视频ID     |
| created_at | time.Time | 无         | 无                               | 创建时间戳 |

- follow表

| 列名             | 数据类型  | 约束       | 索引                            | 备注       |
| ---------------- | --------- | ---------- | ------------------------------- | ---------- |
| id               | uint      | 主键，自增 | 无                              | 关注记录ID |
| user_id          | int       | 外键       | idx_follow，idx_follow_user     | 用户ID     |
| followed_user_id | int       | 外键       | idx_follow，idx_follow_followed | 粉丝ID     |
| created_at       | time.Time | 无         | 无                              | 创建时间戳 |

- message表

| 列名         | 数据类型     | 约束       | 索引        | 备注         |
| ------------ | ------------ | ---------- | ----------- | ------------ |
| id           | uint         | 主键，自增 | 无          | 消息记录ID   |
| from_user_id | int          | 外键       | idx_message | 发送者用户ID |
| to_user_id   | int          | 外键       | idx_message | 接收者用户ID |
| content      | string(1024) | 无         | 无          | 消息内容     |
| created_at   | time.Time    | 无         | 无          | 创建时间戳   |

各表图形化展示：

![ER图](.vuepress\public\images\er图.png)

#### 3.2.4 Redis缓存设计

| Redis数据库 | 键                            | 值                   | 描述       |
| ----------- | ----------------------------- | -------------------- | ---------- |
| 0           | chat_messages:user_id:user_id | messagePb.Message    | 消息缓存   |
| 1           | video_id                      | videoPb.Video        | 视频流缓存 |
| 2           | video_id                      | []*commentPb.Comment | 评论缓存   |

#### 3.2.5 架构思路

针对本项目，基于所提供的技术栈和场景需求，采用如下架构来实现一个高效、稳定的抖音后端系统：

> 1. **用户认证和授权**： 基于 JWT 技术实现用户认证和授权，保障用户数据的安全性和隐私。
> 2. **微服务架构**： 将不同的功能模块拆分为微服务，例如用户管理、视频上传、视频处理等，每个微服务独立部署，通过 Docker 实现容器化部署和扩展。
> 3. **数据库选择**： 使用 MySQL 作为主要的关系型数据库，存储用户信息、视频信息等，使用 GORM 进行数据库操作，确保数据的持久性和一致性。
> 4. **分布式存储**： 利用七牛云存储系统来存储上传的视频文件，减轻服务器的存储压力，同时提供可靠的数据持久性和扩展性。
> 5. **缓存**： 使用 Redis 作为缓存系统，加速热门数据的读取，如视频流数据、好友聊天记录等，降低数据库压力。
> 6. **限流与熔断**： 使用 Hystrix 实现限流和熔断机制，防止过多的请求对系统造成影响，保障系统的稳定性。
> 7. **消息队列**： 使用 RabbitMQ 作为消息队列，实现异步处理和流量削峰，如视频处理、异步存入数据库等，提高系统的响应速度。
> 8. **服务发现与治理**： 使用 etcd 实现服务的注册、发现和配置管理，确保微服务的可用性和配置的一致性。
> 9. **性能监控与追踪**： 使用 Opentracing 和 Jaeger 对微服务进行性能监控和分布式追踪，及时发现和解决性能问题。

*针对特定的场景环节分析，当前架构方案能解决一部分问题，当然我们也有对更完美架构的展望。*

##### **场景一** **：大V用户专享计划**

> 前提假设：假设预计有 0.5% 的用户属于大V，拥有大量粉丝并频繁上传视频。

解决方案：

> 1. **优先级调整**： 对于大V用户的请求，调整其优先级，确保他们的请求能够更快地得到响应。
> 2. **资源分配**： 为大V用户分配更多的服务器资源，以满足其高并发上传视频的需求。
> 3. **分布式缓存**： 针对大V用户的热门视频，使用 Redis 进行缓存，减轻数据库的压力，提高读取速度。
> 4. **异步处理**： 采用消息队列（如 RabbitMQ）进行视频处理等耗时操作，以避免影响上传速度。
> 5. **弹性扩展机制**：根据实时的上传和访问负载情况，自动调整分配给大V用户的服务器资源。这样可以确保系统在高负载情况下仍能保持稳定和高效。
> 6. **定制化功能和服务**：可以给大V用户提供定制化的功能和服务，如批量视频上传、视频定向推送、粉丝互动等。这些功能可以根据大V用户的需求进行定制开发，以提升用户体验和满足特定的业务需求。
> 7. **高级身份验证和授权**：可以对大V用户采用更加安全和可靠的身份验证和授权机制，例如双因素身份验证、访问令牌的刷新和续期等，以保护大V用户的账号和数据安全。
> 8. **专属服务器资源**：为大V用户分配专属的服务器资源，以确保他们的视频上传和观看能够得到优先处理和响应。这些服务器可以独立部署大V用户相关的微服务模块，如视频处理、推荐系统等，从而提高性能和用户体验。

##### **场景** **二** **：实时推荐系统**

> 为用户提供个性化的视频推荐，以提高用户留存和活跃度。

> 前提假设：
>
> 1. 视频分享平台积累了大量的用户行为数据，如观看历史、点赞、评论等。
> 2. 平台需要实时处理和分析用户行为数据，以生成个性化的视频推荐。

解决方案：

> 1. **数据收集和存储**：建立合适的数据收集和存储机制，将用户行为数据实时收集并保存到数据库或分布式存储系统中。
> 2. **实时数据处理**：采用流式处理框架，如Apache Kafka、Apache Flink等，对用户行为数据进行实时处理和分析，以获取用户偏好和行为模式。
> 3. **推荐算法和模型**：基于用户行为数据，使用机器学习和推荐算法构建个性化推荐模型，为用户生成实时的视频推荐结果。
> 4. **推荐服务接口**：将个性化推荐模型封装成服务接口，供前端或其他微服务调用，实现实时的视频推荐功能。

##### **场景** **三** **：实时评论和弹幕系统**

> 构建一个实时评论和弹幕系统，用户可以即时在观看视频时发表评论和发送弹幕，同时确保系统能够处理大量并发的评论和弹幕。

> 前提假设：
>
> 1. 视频分享平台上的视频观看人数众多，用户希望能够实时发表评论和发送弹幕与其他观众互动。
> 2. 系统需要能够处理大量的并发评论和弹幕请求，同时保证实时性和稳定性。

解决方案：

> 1. **实时消息队列**：引入实时消息队列，如Apache Kafka或RabbitMQ，将评论和弹幕消息异步处理。当用户发表评论或发送弹幕时，消息会被发送到消息队列中进行缓冲和处理。
> 2. **异步处理和分布式架构**：采用异步处理和分布式架构，将评论和弹幕消息分发到多个处理节点进行并行处理。这样可以提高系统的并发处理能力和实时性。
> 3. **缓存机制**：为了减轻数据库的负载压力，可以采用缓存机制，如Redis或Memcached，缓存热门视频的评论和弹幕数据，提供快速的读取和展示。
> 4. **弹幕过滤和审核**：为了维护平台的内容质量和用户体验，可以引入弹幕过滤和审核机制，使用敏感词过滤、机器学习模型等技术对弹幕内容进行实时筛选和审核。
> 5. **实时推送和同步**：使用WebSocket等实时推送技术，将新的评论和弹幕实时推送给观看同一视频的其他用户，提供实时的互动体验。

### 3.3 项目代码介绍

#### 3.3.1 项目目录介绍

```Shell
├─.github                       # 存放GitHub相关的配置文件和工作流
│  └─workflows
├─app                           # 应用程序的主要代码
│  ├─comment                    # comment模块
│  │  ├─cmd                     # 微服务启动入口
│  │  ├─dao                     # 访问数据库相关代码
│  │  └─service                 # 业务逻辑处理
│  ├─favorite                   # favorite模块
│  │  ├─cmd                     # 微服务启动入口
│  │  ├─dao                     # 访问数据库相关代码
│  │  ├─script                  # 有关消息队列的脚本
│  │  └─service                 # 业务逻辑处理
│  ├─gateway                    # 网关模块
│  │  ├─cmd                     # 启动网关入口
│  │  ├─http                    # HTTP相关配置
│  │  ├─middleware              # 中间件
│  │  ├─router                  # 路由配置
│  │  ├─rpc                     # 远程过程调用配置
│  │  └─wrapper                 # 包装器(熔断和链路追踪)
│  ├─message                    # message模块
│  │  ├─cmd                     # 微服务启动入口
│  │  ├─dao                     # 访问数据库相关代码
│  │  └─service                 # 业务逻辑处理
│  ├─relation                   # relation模块
│  │  ├─cmd                     # 微服务启动入口
│  │  ├─dao                     # 访问数据库相关代码
│  │  └─service                 # 业务逻辑处理
│  ├─user                       # suer模块
│  │  ├─cmd                     # 微服务启动入口
│  │  ├─dao                     # 访问数据库相关代码
│  │  └─service                 # 业务逻辑处理
│  └─video                      # video模块
│      ├─cmd                     # 微服务启动入口
│      ├─dao                     # 访问数据库相关代码
│      ├─script                  # 有关消息队列的脚本
│      ├─service                 # 业务逻辑处理
│      └─tmp                     # 临时文件
├─config                        # 配置文件
├─consts                        # 常量定义
├─idl                           # 接口定义语言文件
│  ├─comment                    # comment模块的IDL文件
│  │  └─commentPb               # comment模块的Protocol Buffers文件
│  ├─favorite                   # favorite模块的IDL文件
│  │  └─favoritePb              # favorite模块的Protocol Buffers文件
│  ├─message                    # message模块的IDL文件
│  │  └─messagePb               # message模块的Protocol Buffers文件
│  ├─relation                   # relation模块的IDL文件
│  │  └─relationPb              # relation模块的Protocol Buffers文件
│  ├─user                       # user模块的IDL文件
│  │  └─userPb                  # user模块的Protocol Buffers文件
│  └─video                      # video模块的IDL文件
│      └─videoPb                # video模块的Protocol Buffers文件
├─model                         # 数据模型
├─mq                            # 消息队列相关代码
├─test                          # 测试代码
└─util                          # 工具函数和类
```

#### 3.3.2 典型代码介绍

- 网关路由部分

```Go
func NewRouter() *gin.Engine {
    config.Init()
    r := gin.Default()
    //链路追踪
    jaeger, closer, err := wrapper.InitJaeger("HttpService", fmt.Sprintf("%s:%s", config.JaegerHost, config.JaegerPort))
    defer closer.Close()
    if err != nil {
       logger.Info("HttpService init jaeger failed, err:", err)
    }
    r.Use(
       middleware.JWT(),            //JWT中间件
       cors.Default(),              //解决跨域请求
       middleware.Jaeger(jaeger),   //Jaeger中间件
    )
    v1 := r.Group("/douyin")
    {
       v1.GET("/feed", http.FeedHandler)

       v2 := v1.Group("/user")
       {
          v2.POST("/register/", http.RegisterHandler)
          v2.POST("/login/", http.LoginHandler)
          v2.GET("/", http.UserInfoHandler)
       }

       v2 = v1.Group("/publish")
       {
          v2.POST("/action/", http.PublishHandler)
          v2.GET("/list/", http.PublishListHandler)
       }

       v2 = v1.Group("/relation")
       {
          v2.POST("/action/", http.ActionRelationHandler)
          v2.GET("/follow/list/", http.ListFollowRelationHandler)
          v2.GET("/follower/list/", http.ListFollowerRelationHandler)
          v2.GET("/friend/list/", http.ListFriendRelationHandler)
       }

       v2 = v1.Group("/message")
       {
          v2.POST("/action/", http.ActionMessageHandler)
          v2.GET("/chat/", http.ChatMessageHandler)
       }

       v2 = v1.Group("/comment")
       {
          v2.POST("/action/", http.CommentActionHandler)
          v2.GET("/list/", http.CommentListHandler)
       }

       v2 = v1.Group("/favorite")
       {
          v2.POST("/action/", http.FavoriteActionHandler)
          v2.GET("/list/", http.FavoriteListHandler)
       }

    }
    return r

}
```

- 网关启动入口

```Go
func main() {
    config.Init()        //加载配置
    rpc.InitRPC()        //初始化RPC
    etcdReg := etcd.NewRegistry(
       registry.Addrs(fmt.Sprintf("%s:%s", config.EtcdHost, config.EtcdPort)),
    )

    // 得到一个微服务实例
    webService := web.NewService(
       web.Name("HttpService"), // 微服务名字
       web.Address(fmt.Sprintf("%s:%s", config.HttpHost, config.HttpPort)),
       web.Registry(etcdReg),           // etcd注册件
       web.Handler(router.NewRouter()), // 路由
       web.RegisterTTL(time.Second*30), // 服务注册时间
       web.Metadata(map[string]string{"protocol": "http"}),
    )

    _ = webService.Init()
    _ = webService.Run()
}
```

- 部分HTTP转发

```Go
func FeedHandler(ctx *gin.Context) {
    var req videoPb.FeedRequest        
    LatestTime, _ := strconv.Atoi(ctx.Query("latest_time"))        //参数绑定
    req.LatestTime = int64(LatestTime)
    req.Token = ctx.Query("token")
    var res *videoPb.FeedResponse
    hystrix.ConfigureCommand("Feed", wrapper.FeedFuseConfig)        //熔断处理
    err := hystrix.Do("Feed", func() (err error) {
       res, err = rpc.Feed(ctx, &req)
       return err
    }, func(err error) error {
       //降级处理
       wrapper.DefaultFeed(res)
       return err
    })
    if err != nil {
       ctx.JSON(http.StatusInternalServerError, util.FailRequest(err.Error()))
       return
    }
    ctx.JSON(http.StatusOK, gin.H{
       "status_code": res.StatusCode,
       "status_msg":  res.StatusMsg,
       "video_list":  res.VideoList,
    })
}
```

- 部分远程调用

```Go
func Feed(ctx context.Context, req *videoPb.FeedRequest) (res *videoPb.FeedResponse, err error) {
    res, err = VideoService.Feed(ctx, req)
    if err != nil {
       return
    }
    return
}
```

- 部分微服务启动入口

```Go
func main() {
    config.Init()
    dao.InitMySQL()
    dao.InitRedis()
    mq.InitRabbitMQ()
    loadingScript()

    defer dao.RedisClient.Close()

    // etcd注册件
    etcdReg := etcd.NewRegistry(
       registry.Addrs(fmt.Sprintf("%s:%s", config.EtcdHost, config.EtcdPort)),
    )

    // 链路追踪
    tracer, closer, err := wrapper.InitJaeger("VideoService", fmt.Sprintf("%s:%s", config.JaegerHost, config.JaegerPort))
    if err != nil {
       fmt.Printf("new tracer err: %+v\n", err)
       os.Exit(-1)
    }
    defer closer.Close()
    // 得到一个微服务实例
    microService := micro.NewService(
       micro.Name("VideoService"), // 微服务名字
       micro.Address(config.VideoServiceAddress),
       micro.Registry(etcdReg),                                  // etcd注册件
       micro.WrapHandler(ratelimit.NewHandlerWrapper(50000)),    //限流处理
       micro.WrapClient(roundrobin.NewClientWrapper()),          // 负载均衡
       micro.WrapHandler(opentracing.NewHandlerWrapper(tracer)), // 链路追踪
       micro.WrapClient(opentracing.NewClientWrapper(tracer)),   // 链路追踪
    )

    // 结构命令行参数，初始化
    microService.Init()
    // 服务注册
    _ = videoPb.RegisterVideoServiceHandler(microService.Server(), service.GetVideoSrv())
    // 启动微服务
    _ = microService.Run()
}

func loadingScript() {                                        //消息队列脚本
    ctx := context.Background()
    go script.VideoCreateSync(ctx)
    go script.Video2RedisSync(ctx)
}
```

- 部分业务逻辑

```Go
func (v *VideoSrv) Feed(ctx context.Context, req *videoPb.FeedRequest, res *videoPb.FeedResponse) error {

    latestTimeStamp := time.Now().Unix()
    latestTime := time.Unix(latestTimeStamp, 0)
    token := req.Token

    // 使用Keys命令获取所有键
    keys, err := dao.RedisClient.Keys(ctx, "*").Result()
    if err != nil {
       FeedResponseData(res, 1, "获取视频流失败")
       return err
    }
    keys = util.SortKeys(keys)
    var videoList []*videoPb.Video

    //从缓存取对应的视频
    for _, key := range keys {
       // 尝试从 Redis 缓存中获取数据
       redisResult, err := dao.RedisClient.Get(ctx, key).Result()
       if err != nil && err != redis.Nil {
          FeedResponseData(res, 1, "获取视频流失败")
          return err
       }
       if err != redis.Nil {
          var video videoPb.Video
          err = json.Unmarshal([]byte(redisResult), &video)
          if err != nil {
             FeedResponseData(res, 1, "获取视频流失败")
             return err
          }
          if token == "" {
             video.IsFavorite = false
             video.Author.IsFollow = false
          } else {
             video.IsFavorite, _ = dao.NewVideoDao(ctx).GetIsFavorite(int(video.Id), token)
             video.Author.IsFollow, _ = dao.NewVideoDao(ctx).GetIsFollowed(int(video.Author.Id), token)
          }
          videoList = append(videoList, &video)
       }
    }
    if len(keys) == 30 {
       FeedResponseData(res, 0, "获取视频流成功", videoList, latestTimeStamp)
       return nil
    }

    //从数据库取对应的视频
    videos, err := dao.NewVideoDao(ctx).GetVideoListByLatestTime(latestTime, util.StringArray2IntArray(keys), 30-len(keys))
    if err != nil {
       FeedResponseData(res, 1, "获取失败")
       return err
    }
    var nextTime int64
    if len(videos) != 0 {
       nextTime = videos[len(videos)-1].CreatedAt.Unix()
    }
    for _, video := range videos {
       videoPbModel := BuildVideoPbModel(ctx, video, token)
       videoList = append(videoList, videoPbModel)
       //将视频存入缓存，加入消息队列
       body, _ := json.Marshal(&videoPbModel)
       err := mq.SendMessage2MQ(body, consts.Video2RedisQueue)
       if err != nil {
          return err
       }
    }
    FeedResponseData(res, 0, "获取视频流成功", videoList, nextTime)

    return nil
}
```

- 部分消息队列脚本

```Go
func VideoCreateSync(ctx context.Context) {
    Sync := new(SyncVideo)
    err := Sync.SyncVideoCreate(ctx, consts.CreateVideoQueue)
    if err != nil {
       return
    }
}

func (s *SyncVideo) SyncVideoCreate(ctx context.Context, queueName string) error {
    msg, err := mq.ConsumeMessage(ctx, queueName)
    if err != nil {
       return err
    }
    var forever chan struct{}
    go func() {
       for d := range msg {
          // 落库
          var req *videoPb.PublishRequest
          err = json.Unmarshal(d.Body, &req)
          if err != nil {
             return
          }
          err = service.VideoMQ2DB(ctx, req)
          if err != nil {
             return
          }
          d.Ack(false)
       }
    }()
    <-forever
    return nil
}
```

## 四、测试结果

### **4.1 功能测试**

使用Postman软件进行功能测试。同时项目中也包含单元测试，均放在test目录下。

#### UserService

##### /douyin/user/register/ - 用户注册接口

| 用例描述   | 测试结果                                             |
| ---------- | ---------------------------------------------------- |
| 正确请求   | ![img](.vuepress\public\images\1693747834227-17.png) |
| 重复用户名 | ![img](.vuepress\public\images\1693747834228-18.png) |
| 用户名过长 | ![img](.vuepress\public\images\1693747834229-19.png) |
| 密码过长   | ![img](.vuepress\public\images\1693747834229-20.png) |

##### /douyin/user/login/ - 用户登录接口

| 用例描述     | 测试结果                                             |
| ------------ | ---------------------------------------------------- |
| 正确请求     | ![img](.vuepress\public\images\1693747834229-21.png) |
| 用户名不存在 | ![img](.vuepress\public\images\1693747834229-22.png) |
| 密码错误     | ![img](.vuepress\public\images\1693747834229-23.png) |

##### /douyin/user/ - 用户信息

| 用例描述   | 测试结果                                             |
| ---------- | ---------------------------------------------------- |
| 正确请求   | ![img](.vuepress\public\images\1693747834229-24.png) |
| token错误  | ![img](.vuepress\public\images\1693747834229-25.png) |
| 用户不存在 | ![img](.vuepress\public\images\1693747834229-26.png) |

#### VideoService

##### /douyin/feed/ - 视频流接口

| 用例描述           | 测试结果                                             |
| ------------------ | ---------------------------------------------------- |
| 登录状态正确请求   | ![img](.vuepress\public\images\1693747834230-27.png) |
| 未登录状态正确请求 | ![img](.vuepress\public\images\1693747834230-28.png) |
| token错误          | ![img](.vuepress\public\images\1693747834230-29.png) |

##### /douyin/publish/action/ - 视频投稿

| 用例描述  | 测试结果                                             |
| --------- | ---------------------------------------------------- |
| 正确请求  | ![img](.vuepress\public\images\1693747834230-30.png) |
| token错误 | ![img](.vuepress\public\images\1693747834230-31.png) |

##### /douyin/publish/list/ - 发布列表

| 用例描述  | 测试结果                                             |
| --------- | ---------------------------------------------------- |
| 正确请求  | ![img](.vuepress\public\images\1693747834230-32.png) |
| token错误 | ![img](.vuepress\public\images\1693747834230-33.png) |

#### FavoriteService 

##### **/douyin/favorite/list/ - 喜欢列表**

| 用例描述  | 测试结果                                             |
| --------- | ---------------------------------------------------- |
| 正确请求  | ![img](.vuepress\public\images\1693747834230-34.png) |
| token错误 | ![img](.vuepress\public\images\1693747834230-35.png) |

**/douyin/favorite/action/ - 赞操作**

| 用例描述  | 测试结果                                             |
| --------- | ---------------------------------------------------- |
| 点赞成功  | ![img](.vuepress\public\images\1693747834230-36.png) |
| 重复点赞  | ![img](.vuepress\public\images\1693747834230-37.png) |
| 取消点赞  | ![img](.vuepress\public\images\1693747834231-38.png) |
| token错误 | ![img](.vuepress\public\images\1693747834231-39.png) |

#### CommentService

##### douyin/comment/list/ - 评论列表

| 用例描述  | 测试结果                                             |
| --------- | ---------------------------------------------------- |
| 正确请求  | ![img](.vuepress\public\images\1693747834231-40.png) |
| token错误 | ![img](.vuepress\public\images\1693747834231-41.png) |

##### douyin/comment/action/ - 评论操作

| 用例描述  | 测试结果                                             |
| --------- | ---------------------------------------------------- |
| 成功评论  | ![img](.vuepress\public\images\1693747834231-42.png) |
| 删除评论  | ![img](.vuepress\public\images\1693747834231-43.png) |
| token错误 | ![img](.vuepress\public\images\1693747834231-44.png) |

#### RelationService

##### /douyin/relation/action/ - 关注操作

| 用例描述  | 测试结果                                             |
| --------- | ---------------------------------------------------- |
| 关注成功  | ![img](.vuepress\public\images\1693747834231-45.png) |
| 取消关注  | ![img](.vuepress\public\images\1693747834231-46.png) |
| 关注自己  | ![img](.vuepress\public\images\1693747834231-47.png) |
| 重复关注  | ![img](.vuepress\public\images\1693747834231-48.png) |
| token错误 | ![img](.vuepress\public\images\1693747834232-49.png) |

##### /douyin/relation/follow/list -关注列表

| 用例描述         | 测试结果                                             |
| ---------------- | ---------------------------------------------------- |
| 拉取关注用户列表 | ![img](.vuepress\public\images\1693747834232-50.png) |
| token错误        | ![img](.vuepress\public\images\1693747834232-51.png) |

##### /douyin/relation/friend/list/ - 粉丝列表

| 用例描述     | 测试结果                                             |
| ------------ | ---------------------------------------------------- |
| 拉取粉丝列表 | ![img](.vuepress\public\images\1693747834232-52.png) |
| token错误    | ![img](.vuepress\public\images\1693747834232-53.png) |

#### MessageService

##### /douyin/message/chat/ - 聊天接口

| 用例描述           | 测试结果                                             |
| ------------------ | ---------------------------------------------------- |
| 获取消息列表       | ![img](.vuepress\public\images\1693747834232-54.png) |
| 查看自己与自己聊天 | ![img](.vuepress\public\images\1693747834232-55.png) |
| token错误          | ![img](.vuepress\public\images\1693747834232-56.png) |

##### /douyin/message/action/ - 发送消息

| 用例描述     | 测试结果                                             |
| ------------ | ---------------------------------------------------- |
| 成功发送消息 | ![img](.vuepress\public\images\1693747834232-57.png) |
| token错误    | ![img](.vuepress\public\images\1693747834232-58.png) |

通过所有的功能测试，本次要求实现的所有接口功能均正常。

### **4.2 性能测试**

使用Apache JMeter软件进行性能测试。本次测试选用了三个热门接口，用户登录，点赞视频，评论视频，分别得出相应的聚合报告和图形结果。

- 用户登录

![img](.vuepress\public\images\1693747834232-59.png)

![img](.vuepress\public\images\1693747834232-60.png)

- 点赞视频

![img](.vuepress\public\images\1693747834232-61.png)

![img](.vuepress\public\images\1693747834233-62.png)

- 评论视频

![img](.vuepress\public\images\1693747834233-63.png)

![img](.vuepress\public\images\1693747834233-64.png)

通过对热门接口的性能测试，可以确定本款抖音app可同时容纳5000用户以上同时刷短视频。从上面的测试结果可以看出，点赞视频接口性能表现的比较好，这是由于使用了消息队列对用户的点赞进行了异步处理，以达到流量削峰的目的。由于我们考虑到实际场景下点赞的并发是要远远大于评论的，也就是说10万点赞的视频可能评论只有几千条，所以没有给视频评论接口使用消息队列。也可以看到在高并发场景下响应时间差强人意，这也是我们需要优化的地方。

## 五、Demo 演示视频 

暂时无法在成电飞书文档外展示此内容

## 六、项目总结与反思

### 成果

> 在项目的实施过程中，我们取得了一些显著的成果：

- 成功实现了微服务架构，实现了各个功能模块的解耦和独立部署，提高了系统的可维护性和可扩展性。
- 构建了一个高性能的服务端应用，通过使用 Golang 和相关技术栈，提供了稳定高效的服务能力。
- 引入了降级限流、熔断和负载均衡等机制，提高了系统的稳定性和可靠性。
- 应用链路追踪工具，实时监控系统的性能和运行状态，及时发现和解决潜在的问题。

### 挑战和问题

> 然而，在项目的实施过程中也遇到了一些挑战和问题：

- 微服务架构的拆分和通信需要仔细规划和设计，避免出现过度耦合或通信瓶颈的情况。
- 对于一些复杂的业务逻辑，需要更加细致地进行性能优化，以确保系统能够承受高并发和大规模的请求。
- 监控和追踪工具的配置和管理也需要一定的技术和资源投入。
- 高并发场景下部分接口响应时间较长。

### 未来改进的方向

- 进一步优化性能：针对性地进行性能优化，例如使用分布式缓存技术减少数据库查询、采用更高效的算法等，以提升系统的响应速度和吞吐量。
- 引入雪花算法，在高并发环境下快速生成大量ID并确保唯一性。
- 引入自动化测试和持续集成：建立全面的自动化测试和持续集成流程，确保代码质量和稳定性，减少潜在的错误和问题。
- 加强安全性：进一步加强系统的安全性，包括加密敏感数据、实施访问控制、增强身份认证与授权等措施，以保护系统和用户数据的安全。
- 持续学习和技术更新：跟踪和学习最新的技术趋势，不断提升团队成员的技术能力，以适应快速变化的技术环境。
- 用户体验改进：持续收集用户反馈并改进用户界面和功能体验，提升用户满意度和用户黏性。
- 容错与故障恢复机制：进一步加强系统的容错能力，引入更多的熔断、降级和故障恢复机制，以提高系统的稳定性和可用性。
- 加入Prometheus对服务进行检测和管控，实现对项目更好的管理。
- 扩展和水平扩容：考虑引入更多的负载均衡策略和扩展机制，实现系统的水平扩容能力，以适应业务的快速增长和流量的变化。

通过总结和改进，我们可以进一步提升该项目的质量和性能，为用户提供更好的服务体验，并不断适应和应对市场的变化和挑战。

## 七、其他补充资料

我们的项目从最开始的技术选型到框架转变和版本迭代经历了以下过程。

一开始，我们组的大部分成员对Golang并不熟悉，都处于学习阶段。经过一两次组会的商量讨论后，我们决定选用beego作为项目的后端框架。我们认为beego框架功能较为强大，且内置ORM框架，相比使用Gin还要结合Gorm，beego的bee工具对整个项目的开发也非常方便。因此，我们决定使用beego，并设定了v1版本的预计交付时间为8月14日，并成功按时完成。

然而，我们意识到在项目评比中要获得好的成绩，仅仅使用当前的技术栈是不够的。参考往届的获奖作品，他们使用了更多且更高级的技术栈，而我们目前只使用了beego+MySQL+FFmpeg+七牛云，显然没有竞争力。经过两次会议的商讨，我们一致认为，由于时间充裕，我们可以对当前的项目进行迭代，并加入更多的技术栈，例如gRPC、Redis、etcd等。

于是，我们开始在网上寻找教程和网课，但发现beego结合微服务的实例非常少，比如beego+go-micro+etcd的实例几乎没有。少数找到的教程也不够清晰，于是我们花了近两天的时间进行试错。最终得出的结论是放弃beego+微服务，转而使用Gin+Gorm+微服务。于是，我们的极简版抖音项目正式从1.0版本向2.0版本推进。

当然，这意味着完全抛弃之前的代码，新的版本几乎相当于从零开始。对于某些人来说，可能会觉得之前的工作都白费了。然而，为了脱颖而出，在项目评比中获得奖项，我们只能转换架构重新开始。我们制定了迭代计划，但不幸的是，有三位组员无法参与接下来的迭代开发，因为时间不允许。这给项目迭代带来了额外的困难。只有时间相对空闲的组员承担了更多的代码任务。

由于要学习和编写全新的东西，大家无法系统地学习所有内容。因此，我们采取了一种解决方案，由一名队员率先编写一部分代码，并召开会议向其他组员讲解，以便他们能够快速参与迭代开发。例如，在v2版中，我们使用了go-micro、Redis、RabbitMQ、etcd等技术。一名组员可以先编写一两个微服务，并给出Redis、etcd、RabbitMQ的使用示例，其他队员可以仿照这些示例进行开发。这大大提高了开发效率。如果遇到困难，其他组员会通过远程协助以最快的速度解决问题。

经过近十多天的艰苦奋战，我们的项目v2版如期面世。然而，我们并不满足于此，而是对项目进行持续的优化和更新......
