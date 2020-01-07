function createCssBySettings(settings){
    if(typeof settings === 'string') settings=JSON.parse(settings);
    settings.hover_bg_color = settings.bg_color.replace(/([0]|[0]\.\d|[1])\)$/, 0.9 + ')');
    settings.bg_color = settings.bg_color.replace(/(1\))$/, settings.opacity + ')');
    settings.color = settings.color.replace(/1\)$/, settings.font_opacity + ')');
    settings.is_high_light = settings.is_high_light ? '500' : '400';
    let json = {};
    for (let key in settings) {
        if (key === 'font_size') json['--' + key] = settings[key] + 'px'
        else if (key === 'max_width') json['--' + key] = settings[key] + 'vw'
        else json['--' + key] = settings[key]
    };
    let cssText = JSON.stringify(json).replace(/\"/g, '').replace(/(,--)/g, ";--");
    cssText = cssText.replace(/\{|\}/g, '');
    return cssText;
}

export default createCssBySettings;