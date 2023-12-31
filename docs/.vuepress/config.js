import { defineUserConfig, defaultTheme } from 'vuepress'
export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'ByteRythm 极简抖音项目文档',
    description: '极简版抖音相关文档',
    head: [['link', { rel: 'icon', href: '/images/uestc_logo.png' }]],

    //新增导航条的配置
    theme: defaultTheme({
        // tab栏的图标; 图片 / 会自动去public文件夹里找图片
        logo: '/images/uestc_logo.png',
        // displayAllHeaders: true, // 默认值：false
        sidebar: 'auto',
        // 顶部导航条   
        navbar: [
            // {
            //     text: '介绍',
            //     link: '/pages/introduce.md',
            // },
            // NavbarGroup
            {
                text: '成员简介',
                children: [
                    // {
                    //     text: '安装指南',
                    //     link: '/pages/learnJTs/install_guide.md',
                    //     // 该元素将一直处于激活状态
                    //     activeMatch: '/pages/learnJTs/install_guide.md',
                    // },
                    // {
                    //     text: 'API使用',
                    //     link: '/pages/learnJTs/detail_usage.md',
                    //     activeMatch: '/pages/learnJTs/detail_usage.md',
                    // },
                    {
                        text: '电子科技大学8名学生',
                        link: '/pages/other/other.md',
                    },
                ],
            }, {
                text: 'GitHub',
                // {
                //     text: '安装指南',
                //     link: '/pages/learnJTs/install_guide.md',
                //     // 该元素将一直处于激活状态
                //     activeMatch: '/pages/learnJTs/install_guide.md',
                // },
                // {
                //     text: 'API使用',
                //     link: '/pages/learnJTs/detail_usage.md',
                //     activeMatch: '/pages/learnJTs/detail_usage.md',
                // },
                // text: '项目地址',
                link: 'https://github.com/UESTCByteDance/ByteRhythm',
            },
        ],
        // sidebar: [{//左侧列表
        //     title: 'Group 1',   // 必要的
        //     collapsable: false, // 可选的, 默认值是 true,
        //     sidebarDepth: 1
        // }]
        // repo: 'https://github.com/UESTCByteDance/UESTCByteDance.github.io/',
    }),
})