# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ScrapyItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

    product_name = scrapy.Field()
    product_price = scrapy.Field()
    product_imagelink = scrapy.Field()
    product_url = scrapy.Field()

    pass
