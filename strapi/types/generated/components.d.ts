import type { Schema, Struct } from '@strapi/strapi';

export interface CardsLiveSupport extends Struct.ComponentSchema {
  collectionName: 'components_cards_live_supports';
  info: {
    displayName: 'Live_Support';
  };
  attributes: {
    description: Schema.Attribute.Text;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    title: Schema.Attribute.String;
  };
}

export interface CardsMarketRate extends Struct.ComponentSchema {
  collectionName: 'components_cards_market_rates';
  info: {
    displayName: 'Market_Rate';
  };
  attributes: {
    description: Schema.Attribute.Text;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    title: Schema.Attribute.String;
  };
}

export interface CardsProductCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_product_cards';
  info: {
    displayName: 'Product_Card';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['AiOutlineSwap', 'RiVisaLine', 'RxLapTimer', 'RiP2pLine']
    >;
    key: Schema.Attribute.Enumeration<['swap', 'fiat', 'p2p', 'limit']>;
    text: Schema.Attribute.String;
  };
}

export interface CardsSecureCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_secure_cards';
  info: {
    displayName: 'Secure_Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    title: Schema.Attribute.String;
  };
}

export interface CardsTransactionCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_transaction_cards';
  info: {
    displayName: 'Transaction_Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    span: Schema.Attribute.Enumeration<['one', 'two', 'three']>;
    title: Schema.Attribute.String;
  };
}

export interface DynamicZoneDiscoverCoins extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_discover_coins';
  info: {
    displayName: 'Discover_Coins';
  };
  attributes: {
    coins: Schema.Attribute.Relation<'oneToMany', 'api::logo.logo'>;
    trade_coin: Schema.Attribute.Relation<
      'oneToOne',
      'api::trade-coin.trade-coin'
    >;
  };
}

export interface DynamicZoneFaq extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.Text;
  };
}

export interface DynamicZoneHero extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    hero: Schema.Attribute.Relation<'oneToOne', 'api::hero.hero'>;
  };
}

export interface DynamicZoneRelatedArticles extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_related_articles';
  info: {
    displayName: 'Related_Articles';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.Text;
  };
}

export interface DynamicZoneServices extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface DynamicZoneSteps extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_steps';
  info: {
    displayName: 'Steps';
  };
  attributes: {
    step: Schema.Attribute.Relation<'oneToOne', 'api::step.step'>;
  };
}

export interface DynamicZoneTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_testimonials';
  info: {
    displayName: 'Testimonials';
  };
  attributes: {
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
  };
}

export interface GlobalContact extends Struct.ComponentSchema {
  collectionName: 'components_global_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    email: Schema.Attribute.String;
    social_media_links: Schema.Attribute.Component<
      'shared.social-media-link',
      true
    >;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    columns: Schema.Attribute.Component<'shared.navigation-column', true>;
    copyright: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>;
  };
}

export interface GlobalNavbar extends Struct.ComponentSchema {
  collectionName: 'components_global_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.navigation-column', true>;
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    >;
  };
}

export interface SharedHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.Text;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    description: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedNavigationColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigation_columns';
  info: {
    displayName: 'Navigation-Column';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.link', true>;
    key: Schema.Attribute.Enumeration<['business', 'services']>;
    title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSocialMediaLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_media_links';
  info: {
    displayName: 'Social_Media_Link';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedSteps extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    displayName: 'Steps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedUser extends Struct.ComponentSchema {
  collectionName: 'components_shared_users';
  info: {
    displayName: 'User';
  };
  attributes: {
    country: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.live-support': CardsLiveSupport;
      'cards.market-rate': CardsMarketRate;
      'cards.product-card': CardsProductCard;
      'cards.secure-card': CardsSecureCard;
      'cards.transaction-card': CardsTransactionCard;
      'dynamic-zone.discover-coins': DynamicZoneDiscoverCoins;
      'dynamic-zone.faq': DynamicZoneFaq;
      'dynamic-zone.hero': DynamicZoneHero;
      'dynamic-zone.related-articles': DynamicZoneRelatedArticles;
      'dynamic-zone.services': DynamicZoneServices;
      'dynamic-zone.steps': DynamicZoneSteps;
      'dynamic-zone.testimonials': DynamicZoneTestimonials;
      'global.contact': GlobalContact;
      'global.footer': GlobalFooter;
      'global.navbar': GlobalNavbar;
      'shared.button': SharedButton;
      'shared.header': SharedHeader;
      'shared.link': SharedLink;
      'shared.navigation-column': SharedNavigationColumn;
      'shared.seo': SharedSeo;
      'shared.social-media-link': SharedSocialMediaLink;
      'shared.steps': SharedSteps;
      'shared.user': SharedUser;
    }
  }
}
