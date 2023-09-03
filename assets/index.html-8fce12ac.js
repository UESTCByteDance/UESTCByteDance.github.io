import{_ as s,r as a,o as l,c as o,a as e,b as t,d as n,e as i,f as r}from"./app-7ce3cf78.js";const c="/assets/1693747834226-16-ba37bc78.png",v="/assets/er图-66e347da.png",u="/assets/1693747834227-17-2929fbee.png",m="/assets/1693747834228-18-7399cd70.png",b="/assets/1693747834229-19-a67efb60.png",h="/assets/1693747834229-20-3d3f7cad.png",g="/assets/1693747834229-21-318516c2.png",p="/assets/1693747834229-22-6667ee89.png",f="/assets/1693747834229-23-a66223d9.png",_="/assets/1693747834229-24-0997d808.png",y="/assets/1693747834229-25-fa0a0c34.png",q="/assets/1693747834229-26-3226cedc.png",x="/assets/1693747834230-27-f506f627.png",S="/assets/1693747834230-28-fb25620f.png",R="/assets/1693747834230-29-93315df8.png",k="/assets/1693747834230-30-a7d057ca.png",G="/assets/1693747834230-31-b3d48dc8.png",w="/assets/1693747834230-32-9bb0902d.png",T="/assets/1693747834230-33-819d3986.png",P="/assets/1693747834230-34-7033db3d.png",V="/assets/1693747834230-35-37889870.png",I="/assets/1693747834230-36-b2cd9438.png",D="/assets/1693747834230-37-1b0898d8.png",C="/assets/1693747834231-38-55d59f35.png",F="/assets/1693747834231-39-58e0fde2.png",H="/assets/1693747834231-40-32f40e9c.png",L="/assets/1693747834231-41-7166eb75.png",M="/assets/1693747834231-42-3f0eb7c5.png",N="/assets/1693747834231-43-f3ff4e45.png",E="/assets/1693747834231-44-65b02214.png",A="/assets/1693747834231-45-04da108c.png",B="/assets/1693747834231-46-3611df29.png",J="/assets/1693747834231-47-3a5223d9.png",Q="/assets/1693747834231-48-f9d1646c.png",O="/assets/1693747834232-49-2e55f6c4.png",U="/assets/1693747834232-50-85aa2ab7.png",W="/assets/1693747834232-51-667b01ca.png",j="/assets/1693747834232-52-8cb39613.png",K="/assets/1693747834232-53-886f2186.png",z="/assets/1693747834232-54-f0fffc3c.png",X="/assets/1693747834232-55-731b09ff.png",Y="/assets/1693747834232-56-bab90cf3.png",Z="/assets/1693747834232-57-353c1d00.png",$="/assets/1693747834232-58-8febb6b8.png",ee="/assets/1693747834232-59-bf5bd65b.png",te="/assets/1693747834232-60-18e2e09c.png",ie="/assets/1693747834232-61-f3d1cde7.png",de="/assets/1693747834233-62-fd9c9584.png",ne="/assets/1693747834233-63-0e3d07a8.png",re="/assets/1693747834233-64-c990eea5.png",se={},ae=e("h2",{id:"一、项目介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、项目介绍","aria-hidden":"true"},"#"),t(" 一、项目介绍")],-1),le=e("p",null,[e("strong",null,"简要介绍"),t("：本项目利用 Golang 以及相关技术如 Gorm、MySQL、Redis、JWT、RabbitMQ 、Hystrix、七牛云 等构建了基于 Gin 和 Go-micro的微服务应用，实现了视频处理、对象存储、限流、降级熔断、负载均衡等功能，并通过 Opentracing、Jaeger 等工具进行监控与追踪，Testify进行单元测试，Docker进行容器化部署，形成高可用高性能的分布式服务。")],-1),oe=e("strong",null,"项目服务地址",-1),ce={href:"http://47.113.223.86:8080",target:"_blank",rel:"noopener noreferrer"},ve=e("strong",null,"项目仓库地址",-1),ue={href:"https://github.com/UESTCByteDance/ByteRhythm",target:"_blank",rel:"noopener noreferrer"},me=r('<h2 id="二、项目分工" tabindex="-1"><a class="header-anchor" href="#二、项目分工" aria-hidden="true">#</a> 二、项目分工</h2><table><thead><tr><th><strong>团队成员</strong></th><th><strong>主要贡献</strong></th></tr></thead><tbody><tr><td>王鑫耀</td><td>v1版基础接口，v2版User模块、Video模块，测试、文档撰写</td></tr><tr><td>雷荃悠</td><td>v1版社交接口，v2版Relation模块、Message模块、ppt制作</td></tr><tr><td>黄文彬</td><td>v2版Favorite模块、Comment模块</td></tr><tr><td>唐以恒</td><td>v1版互动接口</td></tr><tr><td>黄绍波</td><td>v1版社交接口</td></tr><tr><td>贺广胜</td><td>ffmpeg，docker，部署项目</td></tr><tr><td>江岸苧</td><td>测试，ppt制作</td></tr><tr><td>罗越</td><td>文档撰写</td></tr></tbody></table><h2 id="三、项目实现" tabindex="-1"><a class="header-anchor" href="#三、项目实现" aria-hidden="true">#</a> 三、项目实现</h2><h3 id="_3-1-技术选型与相关开发文档" tabindex="-1"><a class="header-anchor" href="#_3-1-技术选型与相关开发文档" aria-hidden="true">#</a> 3.1 技术选型与相关开发文档</h3><blockquote><p>问题和目标： 构建一个稳定、高效的视频分享平台，用户可以上传、观看、点赞视频内容，与好友聊天等，同时确保系统具备一定的扩展性和容错性。</p><p>前提假设：</p><ol><li>预计每天有大量的用户上传、观看和分享视频内容，需要支持高并发的访问。</li><li>视频处理和上传至七牛云需要消耗一定的存储空间，所以预计需要一定的存储资源。</li><li>系统需要考虑限流和负载均衡，以防止过多的请求影响系统稳定性。</li><li>用户身份验证和授权需要使用 JWT 技术，确保用户数据的安全性。</li><li>为了保障系统的可用性和容错性，采用了微服务架构，通过 Docker 进行容器化部署。</li><li>为了监控和追踪系统性能，使用了 Opentracing 和 Jaeger 工具。</li></ol><p>存储需求： 考虑到每天大量的视频上传和存储，以及用户数据的存储，预计需要存储空间5G，这些数据可以存放在分布式存储系统中，如七牛云、MySQL、Redis 等。如果考虑项目的部署运行，预计需要存储空间20G。</p><p>服务器需求： 根据高并发的需求和微服务架构，预计需要至少1台服务器。服务器用于部署不同的微服务模块，例如视频处理、用户认证、内容推荐等。</p><p>为了确保视频分享平台的稳定运行和用户满意度，还需要考虑其他方面的因素，如网络带宽、系统监控和故障处理等。综合考虑这些因素，可以建立一个高可用高性能的分布式服务，提供良好的用户体验。</p></blockquote><h3 id="_3-2-架构设计" tabindex="-1"><a class="header-anchor" href="#_3-2-架构设计" aria-hidden="true">#</a> 3.2 架构设计</h3><h4 id="_3-2-1-服务模块划分" tabindex="-1"><a class="header-anchor" href="#_3-2-1-服务模块划分" aria-hidden="true">#</a> 3.2.1 服务模块划分</h4><ul><li>Gin实现API网关，完成HTTP请求的转发。</li><li>Go-micro实现微服务，处理具体的业务逻辑。</li></ul><table><thead><tr><th>微服务</th><th>接口类别</th><th>用途</th></tr></thead><tbody><tr><td>UserService</td><td>基础接口</td><td>用户注册、用户登录、获取用户信息</td></tr><tr><td>VideoService</td><td>基础接口</td><td>获取视频流、发布视频，获取发布视频的列表</td></tr><tr><td>FavoriteService</td><td>互动接口</td><td>视频点赞/取消点赞，获取喜欢视频的列表</td></tr><tr><td>CommentService</td><td>互动接口</td><td>视频评论，获取视频评论列表</td></tr><tr><td>RelationService</td><td>社交接口</td><td>关注、取消关注、获取关注列表、获取粉丝列表、获取好友列表</td></tr><tr><td>MessageService</td><td>社交接口</td><td>发送聊天消息，获取消息列表</td></tr></tbody></table><h4 id="_3-2-2-架构设计图" tabindex="-1"><a class="header-anchor" href="#_3-2-2-架构设计图" aria-hidden="true">#</a> 3.2.2 架构设计图</h4><p><img src="'+c+'" alt="img"></p><h4 id="_3-2-3-关系数据库设计" tabindex="-1"><a class="header-anchor" href="#_3-2-3-关系数据库设计" aria-hidden="true">#</a> 3.2.3 关系数据库设计</h4><ul><li>user表</li></ul><table><thead><tr><th>列名</th><th>数据类型</th><th>约束</th><th>索引</th><th>备注</th></tr></thead><tbody><tr><td>id</td><td>uint</td><td>主键，自增</td><td>idx_user_id</td><td>用户ID</td></tr><tr><td>username</td><td>string</td><td>unique</td><td>idx_user_username</td><td>用户名</td></tr><tr><td>password</td><td>string</td><td>无</td><td>无</td><td>密码</td></tr><tr><td>avatar</td><td>string</td><td>无</td><td>无</td><td>用户头像</td></tr><tr><td>background_image</td><td>string</td><td>无</td><td>无</td><td>背景图片</td></tr><tr><td>signature</td><td>string</td><td>无</td><td>无</td><td>用户签名</td></tr><tr><td>created_at</td><td>time.Time</td><td>无</td><td>无</td><td>创建时间戳</td></tr></tbody></table><ul><li>video表</li></ul><table><thead><tr><th>列名</th><th>数据类型</th><th>约束</th><th>索引</th><th>备注</th></tr></thead><tbody><tr><td>id</td><td>uint</td><td>主键，自增</td><td>无</td><td>用户ID</td></tr><tr><td>author_id</td><td>int</td><td>外键</td><td>idx_video_author_id</td><td>作者ID</td></tr><tr><td>play_url</td><td>string</td><td>无</td><td>无</td><td>播放链接</td></tr><tr><td>cover_url</td><td>string</td><td>无</td><td>无</td><td>封面链接</td></tr><tr><td>title</td><td>string</td><td>无</td><td>无</td><td>视频标题</td></tr><tr><td>created_at</td><td>time.Time</td><td>无</td><td>无</td><td>创建时间戳</td></tr></tbody></table><ul><li>comment表</li></ul><table><thead><tr><th>列名</th><th>数据类型</th><th>约束</th><th>索引</th><th>备注</th></tr></thead><tbody><tr><td>id</td><td>uint</td><td>主键，自增</td><td>无</td><td>评论ID</td></tr><tr><td>user_id</td><td>int</td><td>外键</td><td>无</td><td>用户ID</td></tr><tr><td>video_id</td><td>int</td><td>外键</td><td>idx_comment_video_id</td><td>视频ID</td></tr><tr><td>content</td><td>string(1024)</td><td>无</td><td>无</td><td>评论内容</td></tr><tr><td>created_at</td><td>time.Time</td><td>无</td><td>无</td><td>创建时间戳</td></tr></tbody></table><ul><li>favorite表</li></ul><table><thead><tr><th>列名</th><th>数据类型</th><th>约束</th><th>索引</th><th>备注</th></tr></thead><tbody><tr><td>id</td><td>uint</td><td>主键，自增</td><td>无</td><td>收藏记录ID</td></tr><tr><td>user_id</td><td>int</td><td>外键</td><td>idx_favorite</td><td>用户ID</td></tr><tr><td>video_id</td><td>int</td><td>外键</td><td>idx_favorite，idx_favorite_video</td><td>视频ID</td></tr><tr><td>created_at</td><td>time.Time</td><td>无</td><td>无</td><td>创建时间戳</td></tr></tbody></table><ul><li>follow表</li></ul><table><thead><tr><th>列名</th><th>数据类型</th><th>约束</th><th>索引</th><th>备注</th></tr></thead><tbody><tr><td>id</td><td>uint</td><td>主键，自增</td><td>无</td><td>关注记录ID</td></tr><tr><td>user_id</td><td>int</td><td>外键</td><td>idx_follow，idx_follow_user</td><td>用户ID</td></tr><tr><td>followed_user_id</td><td>int</td><td>外键</td><td>idx_follow，idx_follow_followed</td><td>粉丝ID</td></tr><tr><td>created_at</td><td>time.Time</td><td>无</td><td>无</td><td>创建时间戳</td></tr></tbody></table><ul><li>message表</li></ul><table><thead><tr><th>列名</th><th>数据类型</th><th>约束</th><th>索引</th><th>备注</th></tr></thead><tbody><tr><td>id</td><td>uint</td><td>主键，自增</td><td>无</td><td>消息记录ID</td></tr><tr><td>from_user_id</td><td>int</td><td>外键</td><td>idx_message</td><td>发送者用户ID</td></tr><tr><td>to_user_id</td><td>int</td><td>外键</td><td>idx_message</td><td>接收者用户ID</td></tr><tr><td>content</td><td>string(1024)</td><td>无</td><td>无</td><td>消息内容</td></tr><tr><td>created_at</td><td>time.Time</td><td>无</td><td>无</td><td>创建时间戳</td></tr></tbody></table><p>各表图形化展示：</p><p><img src="'+v+`" alt="ER图"></p><h4 id="_3-2-4-redis缓存设计" tabindex="-1"><a class="header-anchor" href="#_3-2-4-redis缓存设计" aria-hidden="true">#</a> 3.2.4 Redis缓存设计</h4><table><thead><tr><th>Redis数据库</th><th>键</th><th>值</th><th>描述</th></tr></thead><tbody><tr><td>0</td><td>chat_messages:user_id:user_id</td><td>messagePb.Message</td><td>消息缓存</td></tr><tr><td>1</td><td>video_id</td><td>videoPb.Video</td><td>视频流缓存</td></tr><tr><td>2</td><td>video_id</td><td>[]*commentPb.Comment</td><td>评论缓存</td></tr></tbody></table><h4 id="_3-2-5-架构思路" tabindex="-1"><a class="header-anchor" href="#_3-2-5-架构思路" aria-hidden="true">#</a> 3.2.5 架构思路</h4><p>针对本项目，基于所提供的技术栈和场景需求，采用如下架构来实现一个高效、稳定的抖音后端系统：</p><blockquote><ol><li><strong>用户认证和授权</strong>： 基于 JWT 技术实现用户认证和授权，保障用户数据的安全性和隐私。</li><li><strong>微服务架构</strong>： 将不同的功能模块拆分为微服务，例如用户管理、视频上传、视频处理等，每个微服务独立部署，通过 Docker 实现容器化部署和扩展。</li><li><strong>数据库选择</strong>： 使用 MySQL 作为主要的关系型数据库，存储用户信息、视频信息等，使用 GORM 进行数据库操作，确保数据的持久性和一致性。</li><li><strong>分布式存储</strong>： 利用七牛云存储系统来存储上传的视频文件，减轻服务器的存储压力，同时提供可靠的数据持久性和扩展性。</li><li><strong>缓存</strong>： 使用 Redis 作为缓存系统，加速热门数据的读取，如视频流数据、好友聊天记录等，降低数据库压力。</li><li><strong>限流与熔断</strong>： 使用 Hystrix 实现限流和熔断机制，防止过多的请求对系统造成影响，保障系统的稳定性。</li><li><strong>消息队列</strong>： 使用 RabbitMQ 作为消息队列，实现异步处理和流量削峰，如视频处理、异步存入数据库等，提高系统的响应速度。</li><li><strong>服务发现与治理</strong>： 使用 etcd 实现服务的注册、发现和配置管理，确保微服务的可用性和配置的一致性。</li><li><strong>性能监控与追踪</strong>： 使用 Opentracing 和 Jaeger 对微服务进行性能监控和分布式追踪，及时发现和解决性能问题。</li></ol></blockquote><p><em>针对特定的场景环节分析，当前架构方案能解决一部分问题，当然我们也有对更完美架构的展望。</em></p><h5 id="场景一-大v用户专享计划" tabindex="-1"><a class="header-anchor" href="#场景一-大v用户专享计划" aria-hidden="true">#</a> <strong>场景一</strong> <strong>：大V用户专享计划</strong></h5><p>前提假设：假设预计有 0.5% 的用户属于大V，拥有大量粉丝并频繁上传视频。</p><p>解决方案：</p><ol><li><strong>优先级调整</strong>： 对于大V用户的请求，调整其优先级，确保他们的请求能够更快地得到响应。</li><li><strong>资源分配</strong>： 为大V用户分配更多的服务器资源，以满足其高并发上传视频的需求。</li><li><strong>分布式缓存</strong>： 针对大V用户的热门视频，使用 Redis 进行缓存，减轻数据库的压力，提高读取速度。</li><li><strong>异步处理</strong>： 采用消息队列（如 RabbitMQ）进行视频处理等耗时操作，以避免影响上传速度。</li><li><strong>弹性扩展机制</strong>：根据实时的上传和访问负载情况，自动调整分配给大V用户的服务器资源。这样可以确保系统在高负载情况下仍能保持稳定和高效。</li><li><strong>定制化功能和服务</strong>：可以给大V用户提供定制化的功能和服务，如批量视频上传、视频定向推送、粉丝互动等。这些功能可以根据大V用户的需求进行定制开发，以提升用户体验和满足特定的业务需求。</li><li><strong>高级身份验证和授权</strong>：可以对大V用户采用更加安全和可靠的身份验证和授权机制，例如双因素身份验证、访问令牌的刷新和续期等，以保护大V用户的账号和数据安全。</li><li><strong>专属服务器资源</strong>：为大V用户分配专属的服务器资源，以确保他们的视频上传和观看能够得到优先处理和响应。这些服务器可以独立部署大V用户相关的微服务模块，如视频处理、推荐系统等，从而提高性能和用户体验。</li></ol><h5 id="场景-二-实时推荐系统" tabindex="-1"><a class="header-anchor" href="#场景-二-实时推荐系统" aria-hidden="true">#</a> <strong>场景</strong> <strong>二</strong> <strong>：实时推荐系统</strong></h5><p>为用户提供个性化的视频推荐，以提高用户留存和活跃度。</p><p>前提假设：</p><ol><li>视频分享平台积累了大量的用户行为数据，如观看历史、点赞、评论等。</li><li>平台需要实时处理和分析用户行为数据，以生成个性化的视频推荐。</li></ol><p>解决方案：</p><ol><li><strong>数据收集和存储</strong>：建立合适的数据收集和存储机制，将用户行为数据实时收集并保存到数据库或分布式存储系统中。</li><li><strong>实时数据处理</strong>：采用流式处理框架，如Apache Kafka、Apache Flink等，对用户行为数据进行实时处理和分析，以获取用户偏好和行为模式。</li><li><strong>推荐算法和模型</strong>：基于用户行为数据，使用机器学习和推荐算法构建个性化推荐模型，为用户生成实时的视频推荐结果。</li><li><strong>推荐服务接口</strong>：将个性化推荐模型封装成服务接口，供前端或其他微服务调用，实现实时的视频推荐功能。</li></ol><h5 id="场景-三-实时评论和弹幕系统" tabindex="-1"><a class="header-anchor" href="#场景-三-实时评论和弹幕系统" aria-hidden="true">#</a> <strong>场景</strong> <strong>三</strong> <strong>：实时评论和弹幕系统</strong></h5><p>构建一个实时评论和弹幕系统，用户可以即时在观看视频时发表评论和发送弹幕，同时确保系统能够处理大量并发的评论和弹幕。</p><p>前提假设：</p><ol><li>视频分享平台上的视频观看人数众多，用户希望能够实时发表评论和发送弹幕与其他观众互动。</li><li>系统需要能够处理大量的并发评论和弹幕请求，同时保证实时性和稳定性。</li></ol><p>解决方案：</p><ol><li><strong>实时消息队列</strong>：引入实时消息队列，如Apache Kafka或RabbitMQ，将评论和弹幕消息异步处理。当用户发表评论或发送弹幕时，消息会被发送到消息队列中进行缓冲和处理。</li><li><strong>异步处理和分布式架构</strong>：采用异步处理和分布式架构，将评论和弹幕消息分发到多个处理节点进行并行处理。这样可以提高系统的并发处理能力和实时性。</li><li><strong>缓存机制</strong>：为了减轻数据库的负载压力，可以采用缓存机制，如Redis或Memcached，缓存热门视频的评论和弹幕数据，提供快速的读取和展示。</li><li><strong>弹幕过滤和审核</strong>：为了维护平台的内容质量和用户体验，可以引入弹幕过滤和审核机制，使用敏感词过滤、机器学习模型等技术对弹幕内容进行实时筛选和审核。</li><li><strong>实时推送和同步</strong>：使用WebSocket等实时推送技术，将新的评论和弹幕实时推送给观看同一视频的其他用户，提供实时的互动体验。</li></ol><h3 id="_3-3-项目代码介绍" tabindex="-1"><a class="header-anchor" href="#_3-3-项目代码介绍" aria-hidden="true">#</a> 3.3 项目代码介绍</h3><h4 id="_3-3-1-项目目录介绍" tabindex="-1"><a class="header-anchor" href="#_3-3-1-项目目录介绍" aria-hidden="true">#</a> 3.3.1 项目目录介绍</h4><div class="language-Shell line-numbers-mode" data-ext="Shell"><pre class="language-Shell"><code>├─.github                       # 存放GitHub相关的配置文件和工作流
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-2-典型代码介绍" tabindex="-1"><a class="header-anchor" href="#_3-3-2-典型代码介绍" aria-hidden="true">#</a> 3.3.2 典型代码介绍</h4><ul><li>网关路由部分</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func NewRouter() *gin.Engine {
    config.Init()
    r := gin.Default()
    //链路追踪
    jaeger, closer, err := wrapper.InitJaeger(&quot;HttpService&quot;, fmt.Sprintf(&quot;%s:%s&quot;, config.JaegerHost, config.JaegerPort))
    defer closer.Close()
    if err != nil {
       logger.Info(&quot;HttpService init jaeger failed, err:&quot;, err)
    }
    r.Use(
       middleware.JWT(),            //JWT中间件
       cors.Default(),              //解决跨域请求
       middleware.Jaeger(jaeger),   //Jaeger中间件
    )
    v1 := r.Group(&quot;/douyin&quot;)
    {
       v1.GET(&quot;/feed&quot;, http.FeedHandler)

       v2 := v1.Group(&quot;/user&quot;)
       {
          v2.POST(&quot;/register/&quot;, http.RegisterHandler)
          v2.POST(&quot;/login/&quot;, http.LoginHandler)
          v2.GET(&quot;/&quot;, http.UserInfoHandler)
       }

       v2 = v1.Group(&quot;/publish&quot;)
       {
          v2.POST(&quot;/action/&quot;, http.PublishHandler)
          v2.GET(&quot;/list/&quot;, http.PublishListHandler)
       }

       v2 = v1.Group(&quot;/relation&quot;)
       {
          v2.POST(&quot;/action/&quot;, http.ActionRelationHandler)
          v2.GET(&quot;/follow/list/&quot;, http.ListFollowRelationHandler)
          v2.GET(&quot;/follower/list/&quot;, http.ListFollowerRelationHandler)
          v2.GET(&quot;/friend/list/&quot;, http.ListFriendRelationHandler)
       }

       v2 = v1.Group(&quot;/message&quot;)
       {
          v2.POST(&quot;/action/&quot;, http.ActionMessageHandler)
          v2.GET(&quot;/chat/&quot;, http.ChatMessageHandler)
       }

       v2 = v1.Group(&quot;/comment&quot;)
       {
          v2.POST(&quot;/action/&quot;, http.CommentActionHandler)
          v2.GET(&quot;/list/&quot;, http.CommentListHandler)
       }

       v2 = v1.Group(&quot;/favorite&quot;)
       {
          v2.POST(&quot;/action/&quot;, http.FavoriteActionHandler)
          v2.GET(&quot;/list/&quot;, http.FavoriteListHandler)
       }

    }
    return r

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>网关启动入口</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func main() {
    config.Init()        //加载配置
    rpc.InitRPC()        //初始化RPC
    etcdReg := etcd.NewRegistry(
       registry.Addrs(fmt.Sprintf(&quot;%s:%s&quot;, config.EtcdHost, config.EtcdPort)),
    )

    // 得到一个微服务实例
    webService := web.NewService(
       web.Name(&quot;HttpService&quot;), // 微服务名字
       web.Address(fmt.Sprintf(&quot;%s:%s&quot;, config.HttpHost, config.HttpPort)),
       web.Registry(etcdReg),           // etcd注册件
       web.Handler(router.NewRouter()), // 路由
       web.RegisterTTL(time.Second*30), // 服务注册时间
       web.Metadata(map[string]string{&quot;protocol&quot;: &quot;http&quot;}),
    )

    _ = webService.Init()
    _ = webService.Run()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>部分HTTP转发</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func FeedHandler(ctx *gin.Context) {
    var req videoPb.FeedRequest        
    LatestTime, _ := strconv.Atoi(ctx.Query(&quot;latest_time&quot;))        //参数绑定
    req.LatestTime = int64(LatestTime)
    req.Token = ctx.Query(&quot;token&quot;)
    var res *videoPb.FeedResponse
    hystrix.ConfigureCommand(&quot;Feed&quot;, wrapper.FeedFuseConfig)        //熔断处理
    err := hystrix.Do(&quot;Feed&quot;, func() (err error) {
       res, err = rpc.Feed(ctx, &amp;req)
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
       &quot;status_code&quot;: res.StatusCode,
       &quot;status_msg&quot;:  res.StatusMsg,
       &quot;video_list&quot;:  res.VideoList,
    })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>部分远程调用</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func Feed(ctx context.Context, req *videoPb.FeedRequest) (res *videoPb.FeedResponse, err error) {
    res, err = VideoService.Feed(ctx, req)
    if err != nil {
       return
    }
    return
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>部分微服务启动入口</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func main() {
    config.Init()
    dao.InitMySQL()
    dao.InitRedis()
    mq.InitRabbitMQ()
    loadingScript()

    defer dao.RedisClient.Close()

    // etcd注册件
    etcdReg := etcd.NewRegistry(
       registry.Addrs(fmt.Sprintf(&quot;%s:%s&quot;, config.EtcdHost, config.EtcdPort)),
    )

    // 链路追踪
    tracer, closer, err := wrapper.InitJaeger(&quot;VideoService&quot;, fmt.Sprintf(&quot;%s:%s&quot;, config.JaegerHost, config.JaegerPort))
    if err != nil {
       fmt.Printf(&quot;new tracer err: %+v\\n&quot;, err)
       os.Exit(-1)
    }
    defer closer.Close()
    // 得到一个微服务实例
    microService := micro.NewService(
       micro.Name(&quot;VideoService&quot;), // 微服务名字
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>部分业务逻辑</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func (v *VideoSrv) Feed(ctx context.Context, req *videoPb.FeedRequest, res *videoPb.FeedResponse) error {

    latestTimeStamp := time.Now().Unix()
    latestTime := time.Unix(latestTimeStamp, 0)
    token := req.Token

    // 使用Keys命令获取所有键
    keys, err := dao.RedisClient.Keys(ctx, &quot;*&quot;).Result()
    if err != nil {
       FeedResponseData(res, 1, &quot;获取视频流失败&quot;)
       return err
    }
    keys = util.SortKeys(keys)
    var videoList []*videoPb.Video

    //从缓存取对应的视频
    for _, key := range keys {
       // 尝试从 Redis 缓存中获取数据
       redisResult, err := dao.RedisClient.Get(ctx, key).Result()
       if err != nil &amp;&amp; err != redis.Nil {
          FeedResponseData(res, 1, &quot;获取视频流失败&quot;)
          return err
       }
       if err != redis.Nil {
          var video videoPb.Video
          err = json.Unmarshal([]byte(redisResult), &amp;video)
          if err != nil {
             FeedResponseData(res, 1, &quot;获取视频流失败&quot;)
             return err
          }
          if token == &quot;&quot; {
             video.IsFavorite = false
             video.Author.IsFollow = false
          } else {
             video.IsFavorite, _ = dao.NewVideoDao(ctx).GetIsFavorite(int(video.Id), token)
             video.Author.IsFollow, _ = dao.NewVideoDao(ctx).GetIsFollowed(int(video.Author.Id), token)
          }
          videoList = append(videoList, &amp;video)
       }
    }
    if len(keys) == 30 {
       FeedResponseData(res, 0, &quot;获取视频流成功&quot;, videoList, latestTimeStamp)
       return nil
    }

    //从数据库取对应的视频
    videos, err := dao.NewVideoDao(ctx).GetVideoListByLatestTime(latestTime, util.StringArray2IntArray(keys), 30-len(keys))
    if err != nil {
       FeedResponseData(res, 1, &quot;获取失败&quot;)
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
       body, _ := json.Marshal(&amp;videoPbModel)
       err := mq.SendMessage2MQ(body, consts.Video2RedisQueue)
       if err != nil {
          return err
       }
    }
    FeedResponseData(res, 0, &quot;获取视频流成功&quot;, videoList, nextTime)

    return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>部分消息队列脚本</li></ul><div class="language-Go line-numbers-mode" data-ext="Go"><pre class="language-Go"><code>func VideoCreateSync(ctx context.Context) {
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
          err = json.Unmarshal(d.Body, &amp;req)
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
    &lt;-forever
    return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、测试结果" tabindex="-1"><a class="header-anchor" href="#四、测试结果" aria-hidden="true">#</a> 四、测试结果</h2><h3 id="_4-1-功能测试" tabindex="-1"><a class="header-anchor" href="#_4-1-功能测试" aria-hidden="true">#</a> <strong>4.1 功能测试</strong></h3><p>使用Postman软件进行功能测试。同时项目中也包含单元测试，均放在test目录下。</p><h4 id="userservice" tabindex="-1"><a class="header-anchor" href="#userservice" aria-hidden="true">#</a> UserService</h4><h5 id="douyin-user-register-用户注册接口" tabindex="-1"><a class="header-anchor" href="#douyin-user-register-用户注册接口" aria-hidden="true">#</a> /douyin/user/register/ - 用户注册接口</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>正确请求</td><td><img src="`+u+'" alt="img"></td></tr><tr><td>重复用户名</td><td><img src="'+m+'" alt="img"></td></tr><tr><td>用户名过长</td><td><img src="'+b+'" alt="img"></td></tr><tr><td>密码过长</td><td><img src="'+h+'" alt="img"></td></tr></tbody></table><h5 id="douyin-user-login-用户登录接口" tabindex="-1"><a class="header-anchor" href="#douyin-user-login-用户登录接口" aria-hidden="true">#</a> /douyin/user/login/ - 用户登录接口</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>正确请求</td><td><img src="'+g+'" alt="img"></td></tr><tr><td>用户名不存在</td><td><img src="'+p+'" alt="img"></td></tr><tr><td>密码错误</td><td><img src="'+f+'" alt="img"></td></tr></tbody></table><h5 id="douyin-user-用户信息" tabindex="-1"><a class="header-anchor" href="#douyin-user-用户信息" aria-hidden="true">#</a> /douyin/user/ - 用户信息</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>正确请求</td><td><img src="'+_+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+y+'" alt="img"></td></tr><tr><td>用户不存在</td><td><img src="'+q+'" alt="img"></td></tr></tbody></table><h4 id="videoservice" tabindex="-1"><a class="header-anchor" href="#videoservice" aria-hidden="true">#</a> VideoService</h4><h5 id="douyin-feed-视频流接口" tabindex="-1"><a class="header-anchor" href="#douyin-feed-视频流接口" aria-hidden="true">#</a> /douyin/feed/ - 视频流接口</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>登录状态正确请求</td><td><img src="'+x+'" alt="img"></td></tr><tr><td>未登录状态正确请求</td><td><img src="'+S+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+R+'" alt="img"></td></tr></tbody></table><h5 id="douyin-publish-action-视频投稿" tabindex="-1"><a class="header-anchor" href="#douyin-publish-action-视频投稿" aria-hidden="true">#</a> /douyin/publish/action/ - 视频投稿</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>正确请求</td><td><img src="'+k+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+G+'" alt="img"></td></tr></tbody></table><h5 id="douyin-publish-list-发布列表" tabindex="-1"><a class="header-anchor" href="#douyin-publish-list-发布列表" aria-hidden="true">#</a> /douyin/publish/list/ - 发布列表</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>正确请求</td><td><img src="'+w+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+T+'" alt="img"></td></tr></tbody></table><h4 id="favoriteservice" tabindex="-1"><a class="header-anchor" href="#favoriteservice" aria-hidden="true">#</a> FavoriteService</h4><h5 id="douyin-favorite-list-喜欢列表" tabindex="-1"><a class="header-anchor" href="#douyin-favorite-list-喜欢列表" aria-hidden="true">#</a> <strong>/douyin/favorite/list/ - 喜欢列表</strong></h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>正确请求</td><td><img src="'+P+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+V+'" alt="img"></td></tr></tbody></table><p><strong>/douyin/favorite/action/ - 赞操作</strong></p><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>点赞成功</td><td><img src="'+I+'" alt="img"></td></tr><tr><td>重复点赞</td><td><img src="'+D+'" alt="img"></td></tr><tr><td>取消点赞</td><td><img src="'+C+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+F+'" alt="img"></td></tr></tbody></table><h4 id="commentservice" tabindex="-1"><a class="header-anchor" href="#commentservice" aria-hidden="true">#</a> CommentService</h4><h5 id="douyin-comment-list-评论列表" tabindex="-1"><a class="header-anchor" href="#douyin-comment-list-评论列表" aria-hidden="true">#</a> douyin/comment/list/ - 评论列表</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>正确请求</td><td><img src="'+H+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+L+'" alt="img"></td></tr></tbody></table><h5 id="douyin-comment-action-评论操作" tabindex="-1"><a class="header-anchor" href="#douyin-comment-action-评论操作" aria-hidden="true">#</a> douyin/comment/action/ - 评论操作</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>成功评论</td><td><img src="'+M+'" alt="img"></td></tr><tr><td>删除评论</td><td><img src="'+N+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+E+'" alt="img"></td></tr></tbody></table><h4 id="relationservice" tabindex="-1"><a class="header-anchor" href="#relationservice" aria-hidden="true">#</a> RelationService</h4><h5 id="douyin-relation-action-关注操作" tabindex="-1"><a class="header-anchor" href="#douyin-relation-action-关注操作" aria-hidden="true">#</a> /douyin/relation/action/ - 关注操作</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>关注成功</td><td><img src="'+A+'" alt="img"></td></tr><tr><td>取消关注</td><td><img src="'+B+'" alt="img"></td></tr><tr><td>关注自己</td><td><img src="'+J+'" alt="img"></td></tr><tr><td>重复关注</td><td><img src="'+Q+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+O+'" alt="img"></td></tr></tbody></table><h5 id="douyin-relation-follow-list-关注列表" tabindex="-1"><a class="header-anchor" href="#douyin-relation-follow-list-关注列表" aria-hidden="true">#</a> /douyin/relation/follow/list -关注列表</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>拉取关注用户列表</td><td><img src="'+U+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+W+'" alt="img"></td></tr></tbody></table><h5 id="douyin-relation-friend-list-粉丝列表" tabindex="-1"><a class="header-anchor" href="#douyin-relation-friend-list-粉丝列表" aria-hidden="true">#</a> /douyin/relation/friend/list/ - 粉丝列表</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>拉取粉丝列表</td><td><img src="'+j+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+K+'" alt="img"></td></tr></tbody></table><h4 id="messageservice" tabindex="-1"><a class="header-anchor" href="#messageservice" aria-hidden="true">#</a> MessageService</h4><h5 id="douyin-message-chat-聊天接口" tabindex="-1"><a class="header-anchor" href="#douyin-message-chat-聊天接口" aria-hidden="true">#</a> /douyin/message/chat/ - 聊天接口</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>获取消息列表</td><td><img src="'+z+'" alt="img"></td></tr><tr><td>查看自己与自己聊天</td><td><img src="'+X+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+Y+'" alt="img"></td></tr></tbody></table><h5 id="douyin-message-action-发送消息" tabindex="-1"><a class="header-anchor" href="#douyin-message-action-发送消息" aria-hidden="true">#</a> /douyin/message/action/ - 发送消息</h5><table><thead><tr><th>用例描述</th><th>测试结果</th></tr></thead><tbody><tr><td>成功发送消息</td><td><img src="'+Z+'" alt="img"></td></tr><tr><td>token错误</td><td><img src="'+$+'" alt="img"></td></tr></tbody></table><p>通过所有的功能测试，本次要求实现的所有接口功能均正常。</p><h3 id="_4-2-性能测试" tabindex="-1"><a class="header-anchor" href="#_4-2-性能测试" aria-hidden="true">#</a> <strong>4.2 性能测试</strong></h3><p>使用Apache JMeter软件进行性能测试。本次测试选用了三个热门接口，用户登录，点赞视频，评论视频，分别得出相应的聚合报告和图形结果。</p><ul><li>用户登录</li></ul><p><img src="'+ee+'" alt="img"></p><p><img src="'+te+'" alt="img"></p><ul><li>点赞视频</li></ul><p><img src="'+ie+'" alt="img"></p><p><img src="'+de+'" alt="img"></p><ul><li>评论视频</li></ul><p><img src="'+ne+'" alt="img"></p><p><img src="'+re+'" alt="img"></p><p>通过对热门接口的性能测试，可以确定本款抖音app可同时容纳5000用户以上同时刷短视频。从上面的测试结果可以看出，点赞视频接口性能表现的比较好，这是由于使用了消息队列对用户的点赞进行了异步处理，以达到流量削峰的目的。由于我们考虑到实际场景下点赞的并发是要远远大于评论的，也就是说10万点赞的视频可能评论只有几千条，所以没有给视频评论接口使用消息队列。也可以看到在高并发场景下响应时间差强人意，这也是我们需要优化的地方。</p><h2 id="五、demo-演示视频" tabindex="-1"><a class="header-anchor" href="#五、demo-演示视频" aria-hidden="true">#</a> 五、Demo 演示视频</h2>',119),be=r('<p><video src="https://github.com/UESTCByteDance/UESTCByteDance.github.io/blob/main/tiktok.mp4" controls></video></p><h2 id="六、项目总结与反思" tabindex="-1"><a class="header-anchor" href="#六、项目总结与反思" aria-hidden="true">#</a> 六、项目总结与反思</h2><h3 id="成果" tabindex="-1"><a class="header-anchor" href="#成果" aria-hidden="true">#</a> 成果</h3><blockquote><p>在项目的实施过程中，我们取得了一些显著的成果：</p></blockquote><ul><li>成功实现了微服务架构，实现了各个功能模块的解耦和独立部署，提高了系统的可维护性和可扩展性。</li><li>构建了一个高性能的服务端应用，通过使用 Golang 和相关技术栈，提供了稳定高效的服务能力。</li><li>引入了降级限流、熔断和负载均衡等机制，提高了系统的稳定性和可靠性。</li><li>应用链路追踪工具，实时监控系统的性能和运行状态，及时发现和解决潜在的问题。</li></ul><h3 id="挑战和问题" tabindex="-1"><a class="header-anchor" href="#挑战和问题" aria-hidden="true">#</a> 挑战和问题</h3><blockquote><p>然而，在项目的实施过程中也遇到了一些挑战和问题：</p></blockquote><ul><li>微服务架构的拆分和通信需要仔细规划和设计，避免出现过度耦合或通信瓶颈的情况。</li><li>对于一些复杂的业务逻辑，需要更加细致地进行性能优化，以确保系统能够承受高并发和大规模的请求。</li><li>监控和追踪工具的配置和管理也需要一定的技术和资源投入。</li><li>高并发场景下部分接口响应时间较长。</li></ul><h3 id="未来改进的方向" tabindex="-1"><a class="header-anchor" href="#未来改进的方向" aria-hidden="true">#</a> 未来改进的方向</h3><ul><li>进一步优化性能：针对性地进行性能优化，例如使用分布式缓存技术减少数据库查询、采用更高效的算法等，以提升系统的响应速度和吞吐量。</li><li>引入雪花算法，在高并发环境下快速生成大量ID并确保唯一性。</li><li>引入自动化测试和持续集成：建立全面的自动化测试和持续集成流程，确保代码质量和稳定性，减少潜在的错误和问题。</li><li>加强安全性：进一步加强系统的安全性，包括加密敏感数据、实施访问控制、增强身份认证与授权等措施，以保护系统和用户数据的安全。</li><li>持续学习和技术更新：跟踪和学习最新的技术趋势，不断提升团队成员的技术能力，以适应快速变化的技术环境。</li><li>用户体验改进：持续收集用户反馈并改进用户界面和功能体验，提升用户满意度和用户黏性。</li><li>容错与故障恢复机制：进一步加强系统的容错能力，引入更多的熔断、降级和故障恢复机制，以提高系统的稳定性和可用性。</li><li>加入Prometheus对服务进行检测和管控，实现对项目更好的管理。</li><li>扩展和水平扩容：考虑引入更多的负载均衡策略和扩展机制，实现系统的水平扩容能力，以适应业务的快速增长和流量的变化。</li></ul><p>通过总结和改进，我们可以进一步提升该项目的质量和性能，为用户提供更好的服务体验，并不断适应和应对市场的变化和挑战。</p><h2 id="七、其他补充资料" tabindex="-1"><a class="header-anchor" href="#七、其他补充资料" aria-hidden="true">#</a> 七、其他补充资料</h2><p>我们的项目从最开始的技术选型到框架转变和版本迭代经历了以下过程。</p><p>一开始，我们组的大部分成员对Golang并不熟悉，都处于学习阶段。经过一两次组会的商量讨论后，我们决定选用beego作为项目的后端框架。我们认为beego框架功能较为强大，且内置ORM框架，相比使用Gin还要结合Gorm，beego的bee工具对整个项目的开发也非常方便。因此，我们决定使用beego，并设定了v1版本的预计交付时间为8月14日，并成功按时完成。</p><p>然而，我们意识到在项目评比中要获得好的成绩，仅仅使用当前的技术栈是不够的。参考往届的获奖作品，他们使用了更多且更高级的技术栈，而我们目前只使用了beego+MySQL+FFmpeg+七牛云，显然没有竞争力。经过两次会议的商讨，我们一致认为，由于时间充裕，我们可以对当前的项目进行迭代，并加入更多的技术栈，例如gRPC、Redis、etcd等。</p><p>于是，我们开始在网上寻找教程和网课，但发现beego结合微服务的实例非常少，比如beego+go-micro+etcd的实例几乎没有。少数找到的教程也不够清晰，于是我们花了近两天的时间进行试错。最终得出的结论是放弃beego+微服务，转而使用Gin+Gorm+微服务。于是，我们的极简版抖音项目正式从1.0版本向2.0版本推进。</p><p>当然，这意味着完全抛弃之前的代码，新的版本几乎相当于从零开始。对于某些人来说，可能会觉得之前的工作都白费了。然而，为了脱颖而出，在项目评比中获得奖项，我们只能转换架构重新开始。我们制定了迭代计划，但不幸的是，有三位组员无法参与接下来的迭代开发，因为时间不允许。这给项目迭代带来了额外的困难。只有时间相对空闲的组员承担了更多的代码任务。</p><p>由于要学习和编写全新的东西，大家无法系统地学习所有内容。因此，我们采取了一种解决方案，由一名队员率先编写一部分代码，并召开会议向其他组员讲解，以便他们能够快速参与迭代开发。例如，在v2版中，我们使用了go-micro、Redis、RabbitMQ、etcd等技术。一名组员可以先编写一两个微服务，并给出Redis、etcd、RabbitMQ的使用示例，其他队员可以仿照这些示例进行开发。这大大提高了开发效率。如果遇到困难，其他组员会通过远程协助以最快的速度解决问题。</p><p>经过近十多天的艰苦奋战，我们的项目v2版如期面世。然而，我们并不满足于此，而是对项目进行持续的优化和更新......</p>',19);function he(ge,pe){const d=a("ExternalLinkIcon");return l(),o("div",null,[ae,e("blockquote",null,[le,e("p",null,[oe,t("："),e("a",ce,[t("http://47.113.223.86:8080"),n(d)])]),e("p",null,[ve,t("："),e("a",ue,[t("https://github.com/UESTCByteDance/ByteRhythm"),n(d)])])]),me,i(" 暂时无法在成电飞书文档外展示此内容 "),i(' <iframeVideo ihtml="https://player.bilibili.com/player.html?aid=90992146&cid=155380603&page=1&danmaku=0&high_quality=1"></iframeVideo > '),i(' <iframeVideo ihtml="https://player.bilibili.com/player.html?aid=90992146&cid=155380603&page=2&danmaku=0&high_quality=1"></iframeVideo > '),be])}const _e=s(se,[["render",he],["__file","index.html.vue"]]);export{_e as default};
