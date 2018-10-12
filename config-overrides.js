const {injectBabelPlugin, getLoader} = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
    return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}
const path = require('path');

const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
    // babel-plugin-import
    config = injectBabelPlugin(['import', {
        libraryName: 'antd-mobile',
        //style: 'css',
        style: true, // use less for customized theme
    }], config);

    //自定义主题
    config.module.rules[1].oneOf.unshift(
        {
            test: /\.less$/,
            use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },
                },
                {
                    loader: require.resolve('less-loader'),
                    // options: {
                    //     // theme vars, also can use theme.js instead of this.
                    //     modifyVars: {"@primary-color": "#1DA57A"},
                    //     javascriptEnabled: true,
                    // },
                },
            ]
        }
    );

    // css-modules
    config.module.rules[1].oneOf.unshift(
        {
            test: /\.(css|less|scss)$/,
            exclude: /node_modules|antd-mobile\.css/,
            use: [
                require.resolve('style-loader'),
                {
                    loader: require.resolve('css-loader'),
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[local]___[hash:base64:5]'
                    },
                },
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebookincubator/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                            }),
                        ],
                    },

                },
                {

                    loader: require.resolve('less-loader'),
                }
                ,
                {

                    loader: require.resolve('sass-loader'),
                }
            ]
        },
        {
            test: /\.(svg)$/i,
            use: [
                'svg-sprite-loader'
            ],

            exclude: /node_modules/
        }
    );

    // 路径别名, 懒癌福音，别名只能在.js文件中使用。
    config.resolve.alias={
            js: path.resolve(__dirname, 'src/js'),//代码根目录
            style: path.resolve(__dirname, 'src/styles'),//通用样式根目录
            images: path.resolve(__dirname, 'src/images'),//图片根目录
        }


    // file-loader exclude
    let l = getLoader(config.module.rules, fileLoaderMatcher);
    l.exclude.push(/\.less$/);

    //设置主题颜色
    // config = rewireLess.withLoaderOptions({
    //     modifyVars: { "@primary-color": "#1DA57A" },
    //     javascriptEnabled: true,
    // })(config, env);

    return config;
};