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
                        text: '待完善...',
                        link: '/pages/other/other.md',
                    },
                ],
            },
        ],
        repo: 'https://github.com/UESTCByteDance/ByteRhythm',
    }),
})