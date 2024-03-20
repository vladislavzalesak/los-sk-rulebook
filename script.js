var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function GenerateContentTable(target,initialElement)
{
    var targetSection = $(target)[0];
    var articles = [...document.querySelectorAll("#root > article")];
    articles.forEach((article) => {
            var title = article.querySelector(':scope > h1');
            var contentTitle = document.createElement('h3');
            var list = document.createElement('ol');
            title.querySelector(':scope > br').replaceWith(' - ')
            contentTitle.innerText = title.innerText;
            var elements = [...article.querySelectorAll(":scope li>span.header")];
            elements.forEach(item => {
                var number = item.parentElement.getAttribute('data-number');
                var newElement = document.createElement('li');
                var anchor = document.createElement('a');
                anchor.href=`#anchor-${number}`;
                anchor.innerText=item.innerText;
                newElement.append(anchor);
                newElement.setAttribute('data-number', number);
                list.appendChild(newElement);

            });
            targetSection.appendChild(contentTitle);
            targetSection.appendChild(list);
        });

}

function GetLabel(alpha, number,prefix)
{
    if(alpha)
        return alphabet[number-1]+')';
    else
    {
        var value = (prefix == '') ? number++ : prefix+'.'+(number++);
        return  value;
    }}
function generateNumbering(element, prefix,number) {
    if(element.tagName.toLowerCase() == 'section'.toLowerCase())
        var scope = ':scope > article';
    else if(element.tagName.toLowerCase() == 'ol'.toLowerCase())
        var scope = ':scope > li';
    var items =  [...element.querySelectorAll(scope)];
    var alpha = element.classList.contains('letter');
    var value = prefix;
    var last = 0;
    items.forEach(li => {
        if(!(element.tagName.toLowerCase() == 'section'.toLowerCase()))
        {
            number++;
            value = GetLabel(alpha,number,prefix);
            var valueToSet = value + (prefix=='' ?  '.' : '');
            li.setAttribute('data-number', valueToSet );
            li.setAttribute('id',`anchor-${valueToSet}`);
        }
        var sublists = [...li.querySelectorAll(':scope > ol')];
        sublists.forEach(ol => {
            last = generateNumbering(ol, value,last);
        });
    });
    if(prefix == '' )
        return number;
    else
        return 0;
}

function generateLinkText()
{
    var links = [...document.querySelectorAll('a[href^="#"]')];

    links.forEach(element => {
        var attributeValue = element.getAttribute('href')
        var target = document.querySelector('li[rule-tag="'+attributeValue.slice(1)+'"]');
        if(target != null) {
            element.href='#'+target.id;
            element.textContent = target.getAttribute('data-number');
            element.onmouseover =  function(e)  {
                var hover = document.getElementById(target.id);
                hover.classList.add('target');
           };

           element.onmouseout =  function(e)  {
            var hover = document.getElementById(target.id);
            hover.classList.remove('target');
       };
        }
    });

}



$(document).ready(function()   {
    var initialElement = $('section#root')[0];
    generateNumbering(initialElement,'',0);
    generateLinkText();
    GenerateContentTable('#content-table',initialElement);
});


