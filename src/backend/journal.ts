const journalSelector: Record<string, IJournal> = {

    'https://www.sciencedirect.com': {
        title: '#screen-reader-main-title > span',
        abstract: '.abstract.author > div > p'
    },
    'https://link.springer.com': {
        title: '.c-article-title',
        abstract: '.c-article-section__content  > p'
    },
    'https://www.tandfonline.com': {
        title: '.widget-body > h1 > span',
        abstract: 'div.abstractSection.abstractInFull > p'
    },
    'https://onlinelibrary.wiley.com/': {
        title: '.citation__title',
        abstract: '.article-section__content > p'
    },
    'https://epubs.siam.org': {
        title: '.citation__title',
        abstract: '.abstractSection '
    },
    ' https://ieeexplore.ieee.org': {
        title: '.document-title',
        abstract: '.abstract-text > div > div > div'
    },
    'https://www.osti.gov': {
        title: '.biblio-title',
        abstract: '.search-result-description'
    },
    'https://pubsonline.informs.org': {
        title: '.citation__title',
        abstract: '.abstractSection.abstractInFull > p'
    },
    'https://aip.scitation.org': {
        title: '.title',
        abstract: '.NLM_paragraph'
    },
    'https://ieeexplore.ieee.org': {
        title: '.document-title', 
        abstract: '.abstract-text.row > div > div > div'
    },
    'https://www.ncbi.nlm.nih.gov/': {
        title: '.content-title', 
        abstract: '#abstract-1 > div:nth-child(3) > p'
    },
    'https://agupubs.onlinelibrary.wiley.com':{
        title: '.citation__title',
        abstract: '.article-section__content > p'
    },
    'https://www.worldscientific.com/': {
        title: '.publicationContentTitle > h1',
        abstract: '.abstractSection > p'
    },
    'https://openreview.net': {
        title: '.note_content_title > span',
        abstract: '.note_content_value'
    },
    'https://dl.acm.org': {
        title: '.citation__title',
        abstract: '.abstractSection > p'
    },
    'https://academic.oup.com': {
        title: '.title-wrap > .article-title-main',
        abstract: '.abstract > p'
    },
    'https://pubs.acs.org': {
        title: '.article_header-title > span',
        abstract: '.article_abstract-content > p'
    },
    'https://arxiv.org/': {
        title: '.title',
        abstract: '.abstract'
    },
    'https://hal.science/': {
        title: '.title-lang',
        abstract: '.abstract-content'    
    },
    'https://wires.onlinelibrary.wiley.com/': {
        title: '.citation__title',
        abstract: '.article-section__content > p'
    },
    'https://pubs.rsc.org/': {
        title: '.title_heading',
        abstract: '.abstract > p'
    },
    'https://www.preprints.org/': {
        title: 'h1.show-title',
        abstract: '#submission-content > div:nth-child(8)'
    },
    'https://www.mdpi.com/':{
        title: '.title',
        abstract: '#html-abstract-title > div'
    }


} 

interface IJournal {
    title: string;
    abstract: string;
}

export default journalSelector;