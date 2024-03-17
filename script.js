var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function GenerateContentTable(target)
{
    var targetSection = $(target);

}

function GetLabel(alpha, number,prefix)
{
    if(alpha)
        return alphabet[number-1]+')';
    else
    {
        var value = (prefix == '') ? number++ : prefix+(number++);
        return  value + ((prefix == '') ? '.' : '');
    }}

function generateNumbering(element, prefix) {
    var items =  [...element.querySelectorAll(':scope > li')];
    var alpha = element.classList.contains('letter');
    var number = 0;
    items.forEach(li => {
        number++;
        var value = GetLabel(alpha,number,prefix);
        li.setAttribute('data-number',  value);
        var sublists = [...li.querySelectorAll(':scope > ol')];
        sublists.forEach(ol => {
            generateNumbering(ol,value);
        });
    });
};

function generateLinkText()
{
    var links = [...document.querySelectorAll('a[href^="#"]')];
    var targets = [...document.querySelectorAll('li[id]')];

    links.forEach(element => {
        var attributeValue = element.getAttribute('href')
        var target = document.querySelector('li[id="'+attributeValue.slice(1)+'"]');
        if(target != null) {
            element.textContent = target.getAttribute('data-number');
            console.log('bbb');
            element.onmouseover =  function(e)  {
                var hover = document.getElementById(attributeValue.slice(1));
                hover.classList.add('target');
           };

           element.onmouseout =  function(e)  {
            var hover = document.getElementById(attributeValue.slice(1));
            hover.classList.remove('target');
       };
        }
    });

}


$(document).ready(function()   {
    var initialElement = $('ol.root')[0];
    generateNumbering(initialElement,'');
    generateLinkText();
    GenerateContentTable('#content-table');
});
