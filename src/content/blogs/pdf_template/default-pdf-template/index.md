---
wpId: 13136
title: 'Simple template'
description: 'TODO: Add description'
type: ywraq-pdf-template
createdAt: 2022-05-06T15:07:17
modifiedAt: 2022-05-06T15:07:17
---


![logo](https://plugins.yithemes.com/resources/yith-woocommerce-request-a-quote/pdf-templates/images/default/logo.jpg)

**From:**

**Rosemary’s Studio**

**Customer**:

**{{billing\_first\_name}} {{billing\_last\_name}}**  
{{billing\_company}}  
{{billing\_address\_1}}  
{{billing\_address\_2}}  
{{billing\_city}}, {{billing\_state}} {{billing\_postcode}}  
{{billing\_country}}

**Creation Date**:

Date: {{current\_date}}

**Expiration Date**:

{{current\_date}}

**Quote #{{quote\_number}}**

```html
<style>table.ywraq_template td{ color: #000000;border-bottom-color: #ffffff;font-size:13px;text-transform: none}</style>
```
##table\_content

Product

Qty

Price

Total

```html
<style>.quote-totals td{ font-size:13px } .quote-totals td.subtotal-label{ color: #000000; font-size:15px;} .quote-totals .total-row td{ color: #000000; font-size:17px; font-weight:bold }</style>
```

##table\_totals