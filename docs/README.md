# ByteRhythm文档 
## 一、项目介绍
本项目利用 Golang 以及相关技术如 MySQL、Redis、JWT、RabbitMQ 等构建了基于 Gin 和 Go-micro的微服务应用，实现了视频处理、对象存储、降级限流、熔断、负载均衡等功能，并通过 Opentracing、Jaeger 等工具进行监控与追踪，Docker进行工程化管理，形成高可用高性能的分布式服务。

[项目服务地址](https://github.com/UESTCByteDance/ByteRhythm)

## 二、项目分工

| 团队成员 | 主要贡献 |
|  ----  | ----  |
| 王鑫耀 | v1版基础接口，v2版User模块、Video模块，文档撰写，统筹安排 |
| 雷荃悠 | 	v1版社交接口，v2版Relation模块、Message模块 |
| 黄文彬 | 	v2版Favorite模块、Comment模块 |
| 唐以恒 | 	v1版互动接口 |
| 黄绍波 | 	v1版社交接口 |
| 贺广胜 | 	ffmpeg，docker，部署项目 |
| 江岸苧 | 	测试，文档撰写，ppt制作 |
| 罗越	 | 文档撰写 |

## 三、项目实现
### 3.1 技术选型与相关开发文档
#### 问题和目标：
构建一个稳定、高效的视频分享平台，用户可以上传、观看、点赞视频内容，与好友聊天等，同时确保系统具备一定的扩展性和容错性。
> 前提假设：
> 1.	预计每天有大量的用户上传、观看和分享视频内容，需要支持高并发的访问。
> 2.	视频处理和上传至七牛云需要消耗一定的存储空间，所以预计需要一定的存储资源。
> 3.	系统需要考虑限流和负载均衡，以防止过多的请求影响系统稳定性。
> 4.	用户身份验证和授权需要使用 JWT 技术，确保用户数据的安全性。
> 5.	为了保障系统的可用性和容错性，采用了微服务架构，通过 Docker 进行容器化部署。
> 6.	为了监控和追踪系统性能，使用了 Opentracing 和 Jaeger 工具。
#### 存储需求：
* 考虑到每天大量的视频上传和存储，以及用户数据的存储，预计需要存储空间5G，这些数据可以存放在分布式存储系统中，如七牛云、MySQL、Redis 等。
* 如果考虑项目的部署运行，预计需要存储空间20G。
#### 服务器需求：
* 根据高并发的需求和微服务架构，预计需要至少1台服务器。服务器用于部署不同的微服务模块，例如视频处理、用户认证、内容推荐等。
* 为了确保视频分享平台的稳定运行和用户满意度，还需要考虑其他方面的因素，如网络带宽、系统监控和故障处理等。综合考虑这些因素，可以建立一个高可用高性能的分布式服务，提供良好的用户体验。
### 3.2 架构设计

#### 3.2.1 服务模块划分

- Gin实现API网关，完成HTTP请求的转发
- Go-micro实现微服务，处理具体的业务逻辑

| 微服务          | 接口类别 | 用途                                                     |
| --------------- | -------- | -------------------------------------------------------- |
| UserService     | 基础接口 | 用户注册、用户登录、获取用户信息                         |
| VideoService    | 基础接口 | 获取视频流、发布视频，获取发布视频的列表                 |
| FavoriteService | 互动接口 | 视频点赞/取消点赞，获取喜欢视频的列表                    |
| CommentService  | 互动接口 | 视频评论，获取视频评论列表                               |
| RelationService | 社交接口 | 关注、取消关注、获取关注列表、获取粉丝列表、获取好友列表 |
| MessageService  | 社交接口 | 发送聊天消息，获取消息列表                               |

#### 3.2.2 架构设计图

![img](.vuepress\public\images\架构图.png)

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

#### 3.2.4 Redis缓存设计

| Redis数据库 | 键                            | 值                   | 描述       |
| ----------- | ----------------------------- | -------------------- | ---------- |
| 0           | chat_messages:user_id:user_id | messagePb.Message    | 消息缓存   |
| 1           | video_id                      | videoPb.Video        | 视频流缓存 |
| 2           | video_id                      | []*commentPb.Comment | 评论缓存   |

#### 3.2.5 架构思路

针对本项目，基于所提供的技术栈和场景需求，采用如下架构来实现一个高效、稳定的抖音后端系统：

1.	**用户认证和授权**： 基于 JWT 技术实现用户认证和授权，保障用户数据的安全性和隐私。
2.	**微服务架构**： 将不同的功能模块拆分为微服务，例如用户管理、视频上传、视频处理等，每个微服务独立部署，通过 Docker 实现容器化部署和扩展。
3. **数据库选择**： 使用 MySQL 作为主要的关系型数据库，存储用户信息、视频信息等，使用 GORM 进行数据库操作，确保数据的持久性和一致性。
4.	**分布式存储**： 利用七牛云存储系统来存储上传的视频文件，减轻服务器的存储压力，同时提供可靠的数据持久性和扩展性。
5.	**缓存**： 使用 Redis 作为缓存系统，加速热门数据的读取，如用户登录状态、视频点赞数等，降低数据库压力。
6.	**限流与熔断**： 使用 Hystrix 实现限流和熔断机制，防止过多的请求对系统造成影响，保障系统的稳定性。
7.	**消息队列**： 使用 RabbitMQ 作为消息队列，实现异步处理，如视频处理、异步存入数据库等，提高系统的响应速度。
8.	**服务发现与治理**： 使用 etcd 实现服务的注册、发现和配置管理，确保微服务的可用性和配置的一致性。
9.	**性能监控与追踪**： 使用 Opentracing 和 Jaeger 对微服务进行性能监控和分布式追踪，及时发现和解决性能问题。

针对特定的场景环节分析，当前架构方案能解决一部分问题，当然我们也有对更完美架构的展望。

##### 场景一：大V用户专享计划
> 前提假设：
> 假设预计有 0.5% 的用户属于大V，拥有大量粉丝并频繁上传视频。
###### 解决方案：
1.	**优先级调整**： 对于大V用户的请求，调整其优先级，确保他们的请求能够更快地得到响应。
2.	**资源分配**： 为大V用户分配更多的服务器资源，以满足其高并发上传视频的需求。
3.	**分布式缓存**： 针对大V用户的热门视频，使用 Redis 进行缓存，减轻数据库的压力，提高读取速度。
4.	**异步处理**： 采用消息队列（如 RabbitMQ）进行视频处理等耗时操作，以避免影响上传速度。
5.	**弹性扩展机制**：根据实时的上传和访问负载情况，自动调整分配给大V用户的服务器资源。这样可以确保系统在高负载情况下仍能保持稳定和高效。
6.	**定制化功能和服务**：可以给大V用户提供定制化的功能和服务，如批量视频上传、视频定向推送、粉丝互动等。这些功能可以根据大V用户的需求进行定制开发，以提升用户体验和满足特定的业务需求。
7.	**高级身份验证和授权**：可以对大V用户采用更加安全和可靠的身份验证和授权机制，例如双因素身份验证、访问令牌的刷新和续期等，以保护大V用户的账号和数据安全。
8.	**专属服务器资源**：为大V用户分配专属的服务器资源，以确保他们的视频上传和观看能够得到优先处理和响应。这些服务器可以独立部署大V用户相关的微服务模块，如视频处理、推荐系统等，从而提高性能和用户体验。
##### 场景二：实时推荐系统
为用户提供个性化的视频推荐，以提高用户留存和活跃度。
> 前提假设：
> 1.	视频分享平台积累了大量的用户行为数据，如观看历史、点赞、评论等。
> 2.	平台需要实时处理和分析用户行为数据，以生成个性化的视频推荐。
###### 解决方案：
1.	**数据收集和存储**：建立合适的数据收集和存储机制，将用户行为数据实时收集并保存到数据库或分布式存储系统中。
2.	**实时数据处理**：采用流式处理框架，如Apache Kafka、Apache Flink等，对用户行为数据进行实时处理和分析，以获取用户偏好和行为模式。
3.	**推荐算法和模型**：基于用户行为数据，使用机器学习和推荐算法构建个性化推荐模型，为用户生成实时的视频推荐结果。
4.	**推荐服务接口**：将个性化推荐模型封装成服务接口，供前端或其他微服务调用，实现实时的视频推荐功能。
##### 场景三：实时评论和弹幕系统
构建一个实时评论和弹幕系统，用户可以即时在观看视频时发表评论和发送弹幕，同时确保系统能够处理大量并发的评论和弹幕。
> 前提假设：
> 1.	视频分享平台上的视频观看人数众多，用户希望能够实时发表评论和发送弹幕与其他观众互动。
> 2.	系统需要能够处理大量的并发评论和弹幕请求，同时保证实时性和稳定性。
###### 解决方案：
1.	**实时消息队列**：引入实时消息队列，如Apache Kafka或RabbitMQ，将评论和弹幕消息异步处理。当用户发表评论或发送弹幕时，消息会被发送到消息队列中进行缓冲和处理。
2.	**异步处理和分布式架构**：采用异步处理和分布式架构，将评论和弹幕消息分发到多个处理节点进行并行处理。这样可以提高系统的并发处理能力和实时性。
3.	**缓存机制**：为了减轻数据库的负载压力，可以采用缓存机制，如Redis或Memcached，缓存热门视频的评论和弹幕数据，提供快速的读取和展示。
4.	**弹幕过滤和审核**：为了维护平台的内容质量和用户体验，可以引入弹幕过滤和审核机制，使用敏感词过滤、机器学习模型等技术对弹幕内容进行实时筛选和审核。
5.	**实时推送和同步**：使用WebSocket等实时推送技术，将新的评论和弹幕实时推送给观看同一视频的其他用户，提供实时的互动体验。
### 3.3 项目代码介绍

#### 3.3.1 项目目录介绍

```Shell
.
├── .github                                     # 存放与GitHub操作相关的文件和配置。
│   ├──                                         # 存放GitHub工作流配置文件。
├── app                                         # 应用程序相关的目录。
│   ├── comment                                 # 评论模块。
│   │   ├── cmd                                 # 存放启动评论模块相关代码。
│   │   ├── dao                                 # 评论模块的数据访问对象。
│   │   └── service                             # 评论模块的服务代码。
│   ├── favorite                                # 点赞模块。
│   │   ├── cmd                                 # 存放启动点赞模块的相关代码。
│   │   ├── dao                                 # 点赞模块的数据访问对象。
│   │   ├── script                              # 点赞模块消息队列的脚本文件。
│   │   └── service                             # 点赞模块的服务代码。
│   ├── gateway                                 # 网关模块
│   │   ├── cmd                                 # 存放启动网关模块相关代码。
│   │   ├── http                                # 网关模块的HTTP相关代码。
│   │   ├── middleware                          # 网关模块的中间件代码。
│   │   ├── router                              # 网关模块的路由配置。
│   │   ├── rpc                                 # 网关模块的RPC相关代码。
│   │   └── wrapper                             # 网关模块的包装器代码（降级熔断，链路追踪）。
│   ├── message                                 # 消息模块。
│   │   ├── cmd                                 # 存放启动消息模块的相关代码。
│   │   ├── dao                                 # 消息模块的数据访问对象。
│   │   └── service                             # 消息模块的服务代码。
│   ├── relation                                # 关系模块。
│   │   ├── cmd                                 # 存放启动关系模块的相关代码。
│   │   ├── dao                                 # 关系模块的数据访问对象。
│   │   └── service                             # 关系模块的服务代码
│   ├── user                                    # 用户模块。
│   │   ├── cmd                                 # 存放启动用户模块的相关代码。
│   │   ├── dao                                 # 用户模块的数据访问对象。
│   │   └── service                             # 用户模块的服务代码。
│   └── video                                   # 视频模块。
│       ├── cmd                                 # 存放启动视频模块的相关代码。
│       ├── dao                                 # 视频模块的数据访问对象。
│       ├── script                              # 视频模块消息队列的脚本文件。
│       ├── service                             # 视频模块的服务代码。
│       └── tmp                                 # 视频模块的临时文件。
├── config                                      # 存放配置文件。
├── consts                                      # 存放常量定义文件。
├── idl                                         # 存放接口定义语言（IDL）相关的文件。
│   ├── comment                                 # 评论模块的IDL相关文件。
│   │   ├── commentPb 
│   │   └── commentService.proto
│   ├── favorite                                # 点赞模块的IDL相关文件。
│   │   ├── favoritePb                          # 点赞模块的Protocol Buffers文件。
│   │   └── favoriteService.proto
│   ├── message                                 # 消息模块的IDL相关文件。
│   │   ├── messagePb
│   │   └── messageService.proto
│   ├── relation                                # 关系模块的IDL相关文件。
│   │   ├── relationPb
│   │   └── relationService.proto
│   ├── user                                    # 用户模块的IDL相关文件。
│   │   ├── userPb
│   │   └── userService.proto
│   └── video                                   # 视频模块的IDL相关文件。
│       ├── videoPb
│       └── videoService.proto
├── model                                       # 存放数据库模型相关的文件。
├── mq                                          # 存放消息队列相关的文件。
├── README.md
└── util                                        # 存放通用工具函数或类的文件。
    ├── array_change.go
    ├── fail_request.go
    ├── ffmpeg.go
    ├── md5.go
    ├── sort.go
    ├── token.go
    ├── upload.go
    └── uuid.go
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

## 四、测试结果(未完成)

### **4.1 功能测试**

采用Postman进行功能测试。

#### UserService

##### /douyin/user/register/ - 用户注册接口

| 用例描述   | 测试结果                                                     |
| ---------- | ------------------------------------------------------------ |
| 正确请求   | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NGQ1ZjE2MmYzODBhZDU3YTQ4Mzg5YmQwZTNhYjk3MDFfenZyTnM0eEthQUhoRVprbWNhUFlJamE1eHR2U1RRRlhfVG9rZW46SHRkVmJpdWNZb2I0WmJ4SDRFS2NiWGNLbnJjXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |
| 重复用户名 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YTEzNWU2NmYxNWMzMzBlYzdiNGI0N2U3YmRlZDFjZDNfdE8zajB1UXBHZlM1MTVYakwwMTVDTFNCU1NaZUFXaVZfVG9rZW46U0VvOWJDVFBsbzk4czB4c3FwN2MzQ3Y3bnBmXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |
| 用户名过长 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YTUwY2Q1NzQ3NDU4MWQ3NzBmNmQ4NWNkOGQ1ODdlNzJfNVRscThqRzd0UDM2MXVzaEc5bXVVZGVDM2M1akZhWGJfVG9rZW46QUg3amJwNlg4b3M3UUR4aWpycmNRWnNzbkw2XzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |
| 密码过长   | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YTViYTExZDE5MTc4ZTNiZGQ3YjU2Y2UxMWM2MWRkMDdfMWxSR0lEdHliaVc4eWcwUXJadGlaeXNwTEhuaWo3cHZfVG9rZW46TDFMUWJxTGh0b1JuRTB4WVFHYWNUc2hZblNoXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |

##### /douyin/user/login/ - 用户登录接口

| 用例描述     | 测试结果                                                     |
| ------------ | ------------------------------------------------------------ |
| 正确请求     | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=OThjYjZmMWY1YTE1YmNhNWFmZWRkMDM1ODZiNjNjZTZfcWdoWXVCZ0NpSWdKVzJ1dTVEbXVISWN2a0xuYkxabHBfVG9rZW46U1FVbmJBeUhGb1ZBZFd4eUIxamNRZVV2bkZ3XzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |
| 用户名不存在 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NGZmMTAxNDY3ZjJjNzgwOGY5ZmZlODFlMDg1MTBkOGZfODJqQ1lacHNHbkU2b0pjdU4zNlo3WUxZTlJWNWJ4WEpfVG9rZW46RmlNNmJ5Wm9tb25reXJ4VFFHSGN1c2oybmZoXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |
| 密码错误     | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjNmYjQ0NjZmMTRmZjcxYWMzZWUxY2U4ZDUyZWIxNGRfYkVORnVWVnpwV09LQWQ0b3RWOWhZQTBoaktaczVNV0NfVG9rZW46T1dZWGJNWlNwbzVLbmN4R2ZGQWNvVTlUbnRiXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |

##### /douyin/user/ - 用户信息

| 用例描述   | 测试结果                                                     |
| ---------- | ------------------------------------------------------------ |
| 正确请求   | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTMxZjEzNTIxZWYxMGRkOWY4Mzg3OGQ0OWJmNGRlNzZfaWtaT3I0OHA0bjhLeTZBTW9uVnVGNUhiQ2FOME1HUW9fVG9rZW46UXo3d2JRRU5Hb0Y3WmF4aHFubmN6ek5ubmVjXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |
| token错误  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YzY4NmZjYWRiZWFhZmUwNTRkYjFiM2YxZmVjYmZlMGRfTFFlbnM2cFJoSjF3TDBINllBT01McHY0R3FMMDdURkFfVG9rZW46RzdCbGJDUnMwb1J5cGd4Z1poUmNkS2lFbk9kXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |
| 用户不存在 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NmMyYTkwZWE0YjhjYzg0Yzc5ZDVkYzFjN2VjMDBjNTFfWWNTY0paWGxPRUlBaTkwTjJidjdKQ1h0dmh4a1owNmtfVG9rZW46WEl0MmJtaW9Ib2M2UWp4Q0pta2MxTktibmFnXzE2OTM3NDIzMTU6MTY5Mzc0NTkxNV9WNA) |

#### VideoService

##### /douyin/feed/ - 视频流接口

| 用例描述           | 测试结果                                                     |
| ------------------ | ------------------------------------------------------------ |
| 登录状态正确请求   | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjJhZWU2OTk2NzhkMzk5ODc3MzEyMDkwZjlhYzgzNmNfeHU5eWloN0doRkJ6d0o4Z2J2WlQ5SlpwNnhjTWpkc1lfVG9rZW46WnlsS2JldTJUb01IOU54Q1lmTmNUa29RbmpiXzE2OTM3NDIzNjY6MTY5Mzc0NTk2Nl9WNA) |
| 未登录状态正确请求 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NWQzZTBiODFlYmEzNmE5ZjcxM2ExMWQ3ODY3MTE5Y2RfZUdJMEpRNTIwZTNsNWdiNFpRd1ZPSHlZUHZDSVZuTEdfVG9rZW46TFJEUGJBV3B1bzRmME14UzViQmMwMFJGbkdkXzE2OTM3NDIzNjY6MTY5Mzc0NTk2Nl9WNA) |
| token错误          | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MTgwN2ViOWI3OTc5NmU0Yjk4ODBkNWZiNWMzMjE0NWVfNU41NVdaZGlYZHVSU1Izd21UeWh2ckl4SWFXNFI5dWNfVG9rZW46R0NETGJIVHpVbzFlQ3h4VDNDZmNtcWhZbkZmXzE2OTM3NDIzNjY6MTY5Mzc0NTk2Nl9WNA) |

##### /douyin/publish/action/ - 视频投稿

| 用例描述  | 测试结果                                                     |
| --------- | ------------------------------------------------------------ |
| 正确请求  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTFiMDRjNTE2ZjNkYjQ2NmEzOTBjMGVjZTlkMWRlYzBfM2g4WEFZbHVqWUJlTDNjdTM4R0hoa1gzTkJDZmxPVExfVG9rZW46VzByVmJBcmFXb1pvN3R4UE4zMGNlbFhMbkdoXzE2OTM3NDIzNjY6MTY5Mzc0NTk2Nl9WNA) |
| token错误 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MDY0OTQxZTg4ODE5Y2JmYThhZTZjYjg0ZDczNjlhNGVfd2x5bmM3dkYySGdmT1NWQWtSc3Fuam5xQTNMOFpFYW1fVG9rZW46T3pTTWIzcDZHb0RVUzN4NzBnVWMyNlpCbmRkXzE2OTM3NDIzNjY6MTY5Mzc0NTk2Nl9WNA) |

##### /douyin/publish/list/ - 发布列表

| 用例描述  | 测试结果                                                     |
| --------- | ------------------------------------------------------------ |
| 正确请求  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NmU2MDU4MjEyZDcyMmE0NmYyNGM0MDE0MTQ3YzBiODJfTVBueUFGaWdUSEhSNWdUUTZadkFFQ1dsUDByNHdvWERfVG9rZW46UXhxemJmVExMb1BNSlJ4bDZnbmNUTjNPbjRjXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| token错误 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjY3YWFjMTU2ODc2NDgxZWNkNjNjZWZhNTRiMGZhOTNfdlQyVzNNNmN5OXI5V3lGcElmM0xXVkNTdFJrczh1bkZfVG9rZW46VkNydmJrZXNJb3BVTWJ4eTQ1c2NqNnRsbm9oXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |

#### FavoriteService 

##### **/douyin/favorite/list/ - 喜欢列表**

| 用例描述  | 测试结果                                                     |
| --------- | ------------------------------------------------------------ |
| 正确请求  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2I4NzEzZTZjNDg2ZjY2NzhmNDI2NmVkNTdmMWE4YWFfTkpaNlNvcGVHTEV5azZWWEg0UWV5ejFqYnBZc0p4YjVfVG9rZW46U2ZxY2I1NzFFb0dYOTJ4Nzc2NWNCcWNzbm1lXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| token错误 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=OGUwZTNjODJkZjc5YTA5YmEwMGU5Mzc5NGVlOGMwZGNfS1BkS1dZVVprRVVXb2xMZGxOcXZlQjBjOU1MempKYVFfVG9rZW46VG9UTmJYVUMwbzRacmZ4VVppaWNMODN2bkZiXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |

**/douyin/favorite/action/ - 赞操作**

| 用例描述  | 测试结果                                                     |
| --------- | ------------------------------------------------------------ |
| 点赞成功  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTkwYWE2ZGNhMTRkMTI3N2I2OWU3YTNlOGYwNTI3OGVfMjJVdWFFb3hEMkhxNFo1SzQxT3VoSlNqZmV1Rld2WXlfVG9rZW46TjJGQmJzZVc3b2JlUEh4QUQ5MGNaZENKbndmXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| 重复点赞  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YWQyOGJhMzYzZGRjNGI1ZGYyYTIxYzM1NmE5MGY2NGJfbXRZQ2t6b0txUTZYcVNZeUV6bWExbnAybnBXc2k5bW5fVG9rZW46TjRBVmJOS0lYb0dVRWV4UElLZmNLYnZTbmZiXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| 取消点赞  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MDgyMGEwYzYyOGZkYzEwMWRlNGI5ZjE0Y2UxOTZiMjJfSEd2dUNYUWZGVjYxNTYwTjBKY1dIWGRzN3J3TUI3Q3pfVG9rZW46TUxlSmJ0VzU4b0lnZDd4ekdVRGNKMExKbk5aXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| token错误 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MmQxMDBmNTU2ODA4MDNlNjg2ZGUyMjYwMjY5ZjM5OGFfYWFkdFZZMXJjTEZ4aUtNZ1BPWjQ5YWowd0JzSVIyZUlfVG9rZW46WnFlVWJQOEJXb1czaDZ4OFBzZ2NnZHNEbjVkXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |

#### CommentService

##### douyin/comment/list/ - 评论列表

| 用例描述  | 测试结果                                                     |
| --------- | ------------------------------------------------------------ |
| 正确请求  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NWEzMzE0NjI0NWNjNDI4ZWYwNzBmYzE3YWVmY2U4MjZfZ0JMYzk4dExiSkRGTG9lQzNzbHV2QnIzNk9QcEZBSHpfVG9rZW46RzEzNGJhd2tjb096cWZ4V0dudmN2WTUxbjRjXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| token错误 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MjBiYTdlYzcxYmE5OGU2ZDY2ZDIyODhkMTdmZDFlMjJfTWFPaXE3WVRDOEFjckcyRk90dGNZY0VPa2hCVEFmR3pfVG9rZW46WlNsMmJnWmFxb3hSRmp4ZXRyTmNRaDVPbmVmXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |

##### douyin/comment/action/ - 评论操作

| 用例描述  | 测试结果                                                     |
| --------- | ------------------------------------------------------------ |
| 成功评论  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjU0OGViMGJhNmIxMTZkN2EwMzgxNDFhODYxMDJjOTJfZ2JTUFlFR0Z0Z1B6UUgwZ3VRbVR3SGpyU0dRbDBsSkxfVG9rZW46SkZ3cmJTNUxJb0pER2Z4Q2ZOYWNvaTNKbm9kXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| 删除评论  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NWIyOWNjNjhlOWE1NjY4ZWQzMzA3ZmQxMGNhZWY2YTJfWDJLVWZ1ZWt1dHU1SVVTRVplZUh2SXdGRzFISWxtVjBfVG9rZW46U1Joc2IxbDJzb0hubDB4Y3VkWmNDN3Q2bk1kXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |
| token错误 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=OTFjNDgyOGE4OTRkMjQ3OTkxNDYyYzMwMmYzNDkzNWJfRVRURlVFTHdLeGZpR09HbVQ1T295a3p4TERnTUROaWtfVG9rZW46SEtyU2JzYjg1bzV3c3F4OUp5RWNNc3VnbkxmXzE2OTM3NDIzOTE6MTY5Mzc0NTk5MV9WNA) |

#### RelationService

##### /douyin/relation/action/ - 关注操作

| 用例描述  | 测试结果                                                     |
| --------- | ------------------------------------------------------------ |
| 关注成功  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=ODI0NTlhZWUwOTg4MGYzOWNlMzJiNWZjNTZlMzBhYmRfcDU5SHpzWmlTczQweGhiZzlWelZPNFA0bEk0eDhjRzhfVG9rZW46VkpLcGJhYzJ4b3l5cVZ4OGE2R2NLdHp2bnlnXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| 取消关注  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjAzNTJlYzI1ODBkYTI0ZjkzMDFkNTc5ZmRjYzgwZjlfa05FaVV6OWpvekQ2OWZDZlBDVWVPcWlhQzRDZnBmWFlfVG9rZW46RnFWNGIyRGVHb2xCanl4VXV6R2NZVW93bnNnXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| 关注自己  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NjY1ODAyYmM4Y2U0OWE4ZDMxY2M5YzE2NWExYWNlYmVfRnFLYW9PNEtOcTJVMG45M2FJaERKREQzSnYwYllEMzVfVG9rZW46UTZ1R2Jpelhtb2VjYjd4OGVtb2NRNnAxbktlXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| 重复关注  | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MTdlNjRmN2FkN2M0NGFjMGI1ZjlmNGViZjg5NTNiZmRfWTd2RTRXc1BsTmY0SHVobk5WYUVQWXBLZ0ZJbXh4M2NfVG9rZW46Q1ZXTmJrU0xGb081Mm94RUlINmNCVE5IbnJiXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| token错误 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NmJmMmI3ODZhOTBkMzMzZjNiODNhYTYxNjY4ZGVlNzFfNE9xb1FhbFBkNGoyWkYxSXROZjJabzVHUkMwUTRRSzRfVG9rZW46Tjl3Z2I4VXFRb2VscGR4YUdxU2NsN2ZMbjRnXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |

##### /douyin/relation/follow/list -关注列表

| 用例描述         | 测试结果                                                     |
| ---------------- | ------------------------------------------------------------ |
| 拉取关注用户列表 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjQzNGE2OWI3NzQ3YWQwM2MyZDc1M2VlMzYxMjczODhfY3Q5dkFTU3JsMjdzYXNUT1BqMkF2cXdLa01LVGlmeXRfVG9rZW46UHNZamJCS2pHb3RQUlR4VktVNGNERExCbnNiXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| token错误        | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MTZhNDliYzk2NjJiZTUzNjhiZmNkY2FiN2JlYmU2ODRfTGlUczVaOWRkVUVlaGdOMEtYbGhhbWU1UVBzRXY2VzVfVG9rZW46WnpiUWJrVVR4b3VoaW54MTRmTmNxTkNVbmtlXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |

##### /douyin/relation/friend/list/ - 粉丝列表

| 用例描述     | 测试结果                                                     |
| ------------ | ------------------------------------------------------------ |
| 拉取粉丝列表 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjFmZjQwYWU1NDJlZTVjYThkMmMzYzUxNjIyMDdjNWJfSzBLbHh6NTRRVXlGZUREc0JudDNjcTU4MVp5MEYyaElfVG9rZW46Q0ttd2IzZzRDb2xJWHp4dlJuRGNjam5ibmxoXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| token错误    | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTYzNzAxMmI2ZmVlZjY4OTYwYWEzZjMyZGE0NDlkNjRfUUNSTHlUNmJHN1dBSWhtdjRraE1vUkpGS3BBdElqZE9fVG9rZW46RHRRWmJ4dkNIb292QkN4RFRSaGNpSTh6bjZnXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |

#### MessageService

##### /douyin/message/chat/ - 聊天接口

| 用例描述           | 测试结果                                                     |
| ------------------ | ------------------------------------------------------------ |
| 获取消息列表       | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MTI3YmUyMDdkMzg4ZTEzZWZjZTM0Y2Q5ZGIwMzg1YzJfb0hqZzRGZ0FqRFpWWFJEZThXZXMyNHZqTWF2NHBJb1dfVG9rZW46VDNReGJ6NnpUb0ZrMHd4bnlNV2NxZFVCbk5sXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| 查看自己与自己聊天 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=ODQwYzFkZTM3NGI3OGM4YzZhZjgwMTVkNDY4OWNkZWJfWFlZQUVmM3VtQU1qbUhnb2YxdjJGZmZWRXhaSmtvM1ZfVG9rZW46SlU5ZmJrWUJEb3E5VGh4YnY0TmNCRFN5bjVmXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| token错误          | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=OTQ4NmI4M2UwNDJhMTZjNDllMWJjZjEzN2JhODZiOWZfWnhsRDk2SHhtUjhnUVdNYXVpbjliT1RsV2dVdk1EM1BfVG9rZW46RVI5SmJKNW5Vb3FucU94ckJ5YWNVZ3BZbnhzXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |

##### /douyin/message/action/ - 发送消息

| 用例描述     | 测试结果                                                     |
| ------------ | ------------------------------------------------------------ |
| 成功发送消息 | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=YjY5OWNkZTM5YjdiOWRiNzdiNGFmYmVhOWQwZGQ5NGRfU3FvQTY2SGxNcXVMeWNuN2RKY2k2endDMFp2NmxSaXRfVG9rZW46UThPSmIwZ2ZEbzhmbjJ4QUZqQmNGT1dLbjNlXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |
| token错误    | ![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTQzMDBhZjAwYWM1YWFiZmQ3NjY2ODdhYWM0NmQ0ZjdfS0ZBUmVBVzU5SWVyTnR5eEo3OEFZZ3ZVZzNPeExVdmtfVG9rZW46S2RjMmJVcklqb1ZKdGJ4a2puNmNHOVI4bkljXzE2OTM3NDI0MzQ6MTY5Mzc0NjAzNF9WNA) |

### **4.2 性能测试**

![img](https://uestc.feishu.cn/space/api/box/stream/download/asynccode/?code=MDIxMjY4NDEzZWRkMGRkZmVhMDIxYTc4YjNjZjZiNDlfcGhPcG4zbzlFVWhKckhYcm5YdlZkMEtTSUlkS3dtZGpfVG9rZW46VFBDZWJ4ZWxQb1JwZjV4MzVJOGNwUUl5bkliXzE2OTM3NDI0Njc6MTY5Mzc0NjA2N19WNA)

## 五、Demo 演示视频

<!-- <video id="video" controls="" preload="none" poster="封面">
      <source id="mp4" src="mp4格式视频" type="video/mp4">
</videos> -->
> 视频过大，暂未放入GitHub仓库中



## 六、项目总结与反思
### 成果：
> 在项目的实施过程中，我们取得了一些显著的成果
* 成功实现了微服务架构，实现了各个功能模块的解耦和独立部署，提高了系统的可维护性和可扩展性。
* 构建了一个高性能的服务端应用，通过使用 Golang 和相关技术栈，提供了稳定高效的服务能力。
* 引入了降级限流、熔断和负载均衡等机制，提高了系统的稳定性和可靠性。
* 应用监控和追踪工具，实时监控系统的性能和运行状态，及时发现和解决潜在的问题。
### 挑战和问题：
> 然而，在项目的实施过程中也遇到了一些挑战和问题
* 微服务架构的拆分和通信需要仔细规划和设计，避免出现过度耦合或通信瓶颈的情况。
* 对于一些复杂的业务逻辑，需要更加细致地进行性能优化，以确保系统能够承受高并发和大规模的请求。
* 监控和追踪工具的配置和管理也需要一定的技术和资源投入。
### 未来改进的方向包括：
* **进一步优化性能**：针对性地进行性能优化，例如使用缓存技术减少数据库查询、采用更高效的算法等，以提升系统的响应速度和吞吐量。
* **引入自动化测试和持续集成**：建立全面的自动化测试和持续集成流程，确保代码质量和稳定性，减少潜在的错误和问题。
* **加强安全性**：进一步加强系统的安全性，包括加密敏感数据、实施访问控制、增强身份认证与授权等措施，以保护系统和用户数据的安全。
* **持续学习和技术更新**：跟踪和学习最新的技术趋势，不断提升团队成员的技术能力，以适应快速变化的技术环境。
* **用户体验改进**：持续收集用户反馈并改进用户界面和功能体验，提升用户满意度和用户黏性。
* **容错与故障恢复机制**：进一步加强系统的容错能力，引入更多的熔断、降级和故障恢复机制，以提高系统的稳定性和可用性。
* **扩展和水平扩容**：考虑引入更多的负载均衡策略和扩展机制，实现系统的水平扩容能力，以适应业务的快速增长和流量的变化。
> 通过总结和改进，我们可以进一步提升该项目的质量和性能，为用户提供更好的服务体验，并不断适应和应对市场的变化和挑战。
## 七、其他补充资料

我们的项目从最开始的技术选型到框架转变和版本迭代经历了以下过程。

一开始，我们组的大部分成员对Golang并不熟悉，都处于学习阶段。经过一两次组会的商量讨论后，我们决定选用beego作为项目的后端框架。我们认为beego框架功能较为强大，且内置ORM框架，相比使用Gin还要结合Gorm，beego的bee工具对整个项目的开发也非常方便。因此，我们决定使用beego，并设定了v1版本的预计交付时间为8月14日，并成功按时完成。

然而，我们意识到在项目评比中要获得好的成绩，仅仅使用当前的技术栈是不够的。参考往届的获奖作品，他们使用了更多且更高级的技术栈，而我们目前只使用了beego+MySQL+FFmpeg+七牛云，显然没有竞争力。经过两次会议的商讨，我们一致认为，由于时间充裕，我们可以对当前的项目进行迭代，并加入更多的技术栈，例如gRPC、Redis、etcd等。

于是，我们开始在网上寻找教程和网课，但发现beego结合微服务的实例非常少，比如beego+go-micro+etcd的实例几乎没有。少数找到的教程也不够清晰，于是我们花了近两天的时间进行试错。最终得出的结论是放弃beego+微服务，转而使用Gin+Gorm+微服务。于是，我们的极简版抖音项目正式从1.0版本向2.0版本推进。

当然，这意味着完全抛弃之前的代码，新的版本几乎相当于从零开始。对于某些人来说，可能会觉得之前的工作都白费了。然而，为了脱颖而出，在项目评比中获得奖项，我们只能转换架构重新开始。我们制定了迭代计划，但不幸的是，有三位组员无法参与接下来的迭代开发，因为时间不允许。这给项目迭代带来了额外的困难。只有时间相对空闲的组员承担了更多的代码任务。

由于要学习和编写全新的东西，大家无法系统地学习所有内容。因此，我们采取了一种解决方案，由一名队员率先编写一部分代码，并召开会议向其他组员讲解，以便他们能够快速参与迭代开发。例如，在v2版中，我们使用了go-micro、Redis、RabbitMQ、etcd等技术。一名组员可以先编写一两个微服务，并给出Redis、etcd、RabbitMQ的使用示例，其他队员可以仿照这些示例进行开发。这大大提高了开发效率。如果遇到困难，其他组员会通过远程协助以最快的速度解决问题。

经过近十多天的艰苦奋战，我们的项目v2版如期面世。然而，我们并不满足于此，而是对项目进行持续的优化和更新......



