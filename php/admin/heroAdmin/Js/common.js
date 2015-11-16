/**
 * Created with JetBrains PhpStorm.
 * User: kk
 * Date: 13-8-28
 * Time: 下午4:44
 */
function U() {
    var url = arguments[0] || [];
    var param = arguments[1] || {};
    var url_arr = url.split('/');

    if (!$.isArray(url_arr) || url_arr.length < 2 || url_arr.length > 3) {
        return '';
    }

    if (url_arr.length == 2)
        url_arr.unshift(_GROUP_);

    var pre_arr = ['g', 'm', 'a'];

    var arr = [];
    for (d in pre_arr)
        arr.push(pre_arr[d] + '=' + url_arr[d]);

    for (d in param)
        arr.push(d + '=' + param[d]);

    return _APP_+'?'+arr.join('&');
}

var $e = function( id ) {
	return document.getElementById( id );
};

var loadJS = function ( params ) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement('script');
	script.onload = script.onreadystatechange = script.onerror = function () {
		if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState))
		{
			return;
		}
		script.onload = script.onreadystatechange = script.onerror = null;
		script.src = '';
		script.parentNode.removeChild(script);
		script = null;
		if ( params.callback && ( typeof( params.callback ) == 'function' ) )
		{
			params.callback();
		}
	};
	script.charset = params.charset || document.charset || document.characterSet || 'UTF-8';
	script.src = params.src;
	try {
		head.appendChild(script);
	} catch (exp) {}
};

var dataTemplate = function( tpl, data ){
	var _template = tpl.match(/\<#[\s\S]*#\>/gi);
	var outPrint="";
	var template = _template[0].replace(/(\<#)|(#\>)/gi,"");
	for ( var i = 0, len = data.length; i < len; i++ )
	{
		var matchs = template.match(/\{[\S]*\}/gi);
		var temp="";
		for ( var j = 0, _len = matchs.length; j < _len; j++ )
		{
			if ( temp == "" )
			{
				temp = template;
			}
			var re_match = matchs[j].replace(/[\{\}]/gi,"");
			temp = temp.replace( matchs[j], data[i][re_match] );
		}
		outPrint += temp;
	}

	return tpl.replace(/\<#[\s\S]*#\>/gi, outPrint);
};

var checkRadio = function( name, val ) {
	var obj = document.getElementsByName( name );
	if ( !obj )
	{
		return;
	}
	for ( var i = 0; i < obj.length; i++ )
	{
        if ( obj[i].value == val )
		{
            obj[i].checked = true;
            break;
        }
   }
};
