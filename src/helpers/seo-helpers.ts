export const siteName = 'Arttaca Marketplace';
export const fallbackImage = ''; // TODO set fallback image
export const defaultDescription =
    'Arttaca is a curated platform, bridging physical works with digital NFTs. A place where Artists and Collectors come together and share their passion for Art. Physical, Digital, NFT and NFT+. The new way to exchange, talk, view and trades photography and art.';

export interface PageSection {
    header: string;
    paragraph: string;
    imageUrl: string;
    imageAlt: string;
}

export type PageMetaTags = {
    title: string;
    description: string;
    keywords: string;
    url: string;
    image: string;
    imageTwitter: string;
    sitemapURL?: string;
    type?: 'website';
    cardType?: 'summary_large_image';
};

const wrap = (type: string, value: string): string => {
    return `<${type}>${value}</${type}>`;
};

const addHeaderSection = (section: PageSection) => {
    let content = '<header role="banner"><div>';
    content += wrap('h1', section.header);
    content += wrap('p', section.paragraph);
    content += `<img src="${section.imageUrl}" alt="${section.imageAlt}" />`;
    content += '</div></header>';
    return content;
};

const addSection = (section: PageSection) => {
    let content = '<section><div>';
    content += wrap('h2', section.header);
    content += wrap('p', section.paragraph);
    content += `<img src="${section.imageUrl}" alt="${section.imageAlt}" />`;
    content += '</div></section>';
    return content;
};

const generateHead = (metaTags: PageMetaTags): string => {
    let content = `
        <head>
            <title>${metaTags.title} - ${siteName}</title>
            <meta name="title" content="${metaTags.title} - ${siteName}">
            <meta name="description" content="${metaTags.description}">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="robots" content="index,follow" /> 
            <meta name="keywords" content="${metaTags.keywords}" />
        
            <meta property="og:type" content="${metaTags.type ?? 'website'}">
            <meta property="og:url" content="${metaTags.url}">
            <meta property="og:title" content="${metaTags.title} - ${siteName}">
            <meta property="og:description" content="${metaTags.description}">
            <meta property="og:image" content="${metaTags.image}">
       
            <meta property="twitter:card" content="${
        metaTags.cardType ?? 'summary_large_image'
    }">
            <meta property="twitter:url" content="${metaTags.url}">
            <meta property="twitter:title" content="${
        metaTags.title
    } - ${siteName}">
            <meta property="twitter:description" content="${
        metaTags.description
    }">
            <meta property="twitter:image" content="${metaTags.imageTwitter}">
            
            <meta charset="utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    `;
    if (metaTags.sitemapURL)
        content += `<link rel="sitemap" type="application/xml" title="Sitemap" href="${metaTags.sitemapURL}" />`;
    content += '</head>';
    return content;
};

const generateBody = (
    headerSection: PageSection,
    sections: PageSection[]
): string => {
    let content = '<body>';
    content += addHeaderSection(headerSection);
    for (let i = 0; i < sections.length; i++)
        content += addSection(sections[i]);
    content += '</body>';
    return content;
};

export const createSEOPage = (
    metaTags: PageMetaTags,
    headerSection: PageSection,
    sections: PageSection[]
) => {
    let content = '<html lang="EN">';
    content += generateHead(metaTags);
    content += generateBody(headerSection, sections);
    content += '</html>';
    return content;
};
