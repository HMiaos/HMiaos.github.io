
/*		技能展示
	*   {
	*       temp: @value String         				*         模板
	*       skillsClassify: @value Array                *         掌握的技能综合
	*       	{
					skillLanguage: @value String        *         技能名称
	*       		percent: @value String              *         技能百分比
	*       		skillTooltip: @value Array          *         对技能的描述
				}
	*   }

	temp 有两个值可选：
		"circle"：饼形
		"columns":圆柱
*/

var skills = {
		temp:"circle",
		skillsClassify:[
		{
			skillLanguage:"html5",
			percent:"90%",
			skillTooltip:[
				"熟练掌握各类语义化标签",
				"熟悉对各种标签特性及其相互转换",
				"H5拖拽、视频音频",
				"表格，H5新增表单等……"
			]
		},
		{
			skillLanguage:"CSS3",
			percent:"80%",
			skillTooltip:[
				"掌握浮动及文档流特性",
				"精通定位、浏览器兼容性",
				"CSS3圆角阴影字体等样式有实际案例经验",
				"移动端响应式"
			]
		},
		{
			skillLanguage:"javascript",
			percent:"75%",
			skillTooltip:[
				"了解数据类型、作用域闭包等语言特性",
				"掌握定时器、数组字符串及递归、数组去重等",
				"深入使用DOM\BOM\EVENT，能完成各类组件开发",
				"掌握JS的数据调用、ajax实现机制、各类接口调用",
				"掌握面向对象编程，对封装、继承、多态等均有了解",
				"了解正则表达式，熟悉JS兼容性、JS性能提升"
			]
		},
		{
			skillLanguage:"jQuery",
			percent:"80%",
			skillTooltip:[
				"移动端响应式",
				"了解常用句式",
				"能够熟练应用并且不依赖jQuery，当页面规模不大时可以编写原生代码"
			]
		},
		{
			skillLanguage:"bootstrap",
			percent:"60%",
			skillTooltip:[
				"11111",
				"11111"
			]
		},
		{
			skillLanguage:"canvas",
			percent:"10%",
			skillTooltip:[
				"了解过相关接口绘制各类图形",
				"尝试过canvas开发小游戏",
				"能够用简单的canvas技术结合音频实现动画效果的互动",
				"正在学习"
			]
		},
		{
			skillLanguage:"11111",
			percent:"10%",
			skillTooltip:[
				"11111",
				"11111"
			]
		}
		
	]
}