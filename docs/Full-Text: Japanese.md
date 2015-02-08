
# Full-Text: Japanese
 


 
This article is linked from the [Full-Text](Full-Text.md) page. It gives some insight into the implementation of the full-text features for Japanese text corpora. The Japanese version is [also available as PDF](http://files.basex.org/etc/ja-ft.pdf). Thank you to [Toshio HIRAI](http://blog.infinite.jp) for integrating the lexer in BaseX! 

 
## Introduction

The lexical analysis of Japanese documents is performed by [Igo](http://igo.sourceforge.jp/). Igo is a _morphological analyser_, and some of the advantages and reasons for using Igo are: 

 * compatible with the results of a prominent morphological analyzer "MeCab"
 * it can use the dictionary distributed by the Project MeCab 
 * the morphological analyzer is implemented in Java and is relatively fast 

Japanese tokenization will be activated in BaseX if Igo is found in the classpath. [igo-0.4.3.jar](http://en.sourceforge.jp/projects/igo/releases/) of Igo is currently included in all distributions of BaseX. 


In addition to the library, one of the following dictionary files must either be unzipped into the current directory, or into the `etc` sub-directory of the project’s [Home Directory](Configuration.md#Home_Directory): 

 * IPA Dictionary: [http://files.basex.org/etc/ipadic.zip](http://files.basex.org/etc/ipadic.zip)
 * NAIST Dictionary: [http://files.basex.org/etc/naistdic.zip](http://files.basex.org/etc/naistdic.zip)

### Lexical Analysis

The example sentence "私は本を書きました。(I wrote a book.)" is analyzed as follows. 


    私は本を書きました。
    私      名詞,代名詞,一般,*,*,*,私,ワタシ,ワタシ
    は      助詞,係助詞,*,*,*,*,は,ハ,ワ
    本      名詞,一般,*,*,*,*,本,ホン,ホン
    を      助詞,格助詞,一般,*,*,*,を,ヲ,ヲ
    書き    動詞,自立,*,*,五段・カ行イ音便,連用形,書く,カキ,カキ
    まし    助動詞,*,*,*,特殊・マス,連用形,ます,マシ,マシ
    た      助動詞,*,*,*,特殊・タ,基本形,た,タ,タ
    。      記号,句点,*,*,*,*,。,。,。


The element of the decomposed part is called "Surface", the content analysis is called "Morpheme". The Morpheme component is built as follows: 


    品詞,品詞細分類1,品詞細分類2,品詞細分類3,活用形,活用型,原形,読み,発音
    (POS, subtyping POS 1, subtyping POS 2, subtyping POS 3, inflections, use type, prototype, reading, pronunciation)


Of these, the surface is used as a token. Also, The contents of analysis of a morpheme are used in indexing and stemming. 


### Parsing

During indexing and parsing, the input strings are split into single _tokens_. In order to reduce the index size and speed up search, the following word classes have been intentionally excluded: 

 * Mark 
 * Filler 
 * Postpositional particle 
 * Auxiliary verb 

Thus, in the example above, `私`, `本`, and `書き` will be passed to the indexer for each token. 


### Token Processing

"Fullwidth" and "Halfwidth" (which is defined by [East Asian Width Properties](http://unicode.org/Public/UNIDATA/EastAsianWidth.txt)) are not distinguished (this is the so-called ZENKAKU/HANKAKU problem). For example, `ＸＭＬ` and `XML` will be treated as the same word. If documents are _hybrid_, i.e. written in multiple languages​​, this is also helpful for some other options of the XQuery Full Text Specification, such as the [Case](http://www.w3.org/TR/xpath-full-text-10/#ftcaseoption) or the [Diacritics](http://www.w3.org/TR/xpath-full-text-10/#ftdiacriticsoption) Option. 


### Stemming

Stemming in Japanese means to analyze the results of morphological analysis ("verbs" and "adjectives") that are processed using the "prototype". 


If the stemming option is enabled, for example, the two statements "私は本を書いた (I wrote the book)" and "私は本を書く (I write the book)" can be led back to the same prototype by analyzing their verb: 


    書く    動詞,自立,*,*,五段・カ行イ音便,基本形,[書く],カク,カク
    書い    動詞,自立,*,*,五段・カ行イ音便,連用タ接続,[書く],カイ,カイ
    た      助動詞,*,*,*,特殊・タ,基本形,た,タ,タ


Because the "auxiliary verb" is always excluded from the tokens, there is no need to consider its use. Therefore, the same result (`true`) is returned for the following two types of queries: 


    '私は本を書いた' contains text '書く' using stemming using language 'ja''私は本を書く' contains text '書いた' using stemming using language 'ja'


### Wildcards

The Wildcard option in XQuery Full-Text is available for Japanese as well. The following example is based on '芥川 龍之介(AKUTAGAWA, Ryunosuke)', a prominent Japanese writer, the first name of whom is often spelled as "竜之介". The following two queries both return `true`: 


    '芥川龍之介' contains text '.之介' using wildcards using language 'ja''芥川竜之介' contains text '.之介' using wildcards using language 'ja'


However, there is a special case that requires attention. The following query will yield `false`: 


    '芥川龍之介' contains text '芥川.之介' using wildcards using language 'ja'


This is because the next word boundary metacharacters cannot be determined in the query. In this case, you may insert an additional whitespaces as word boundary: 


    '芥川龍之介' contains text '芥川　.之介' using wildcards using language 'ja'


As an alternative, you may modify the query as follows: 


    '芥川龍之介' contains text '芥川' ftand '.之介' using wildcards using language 'ja'

