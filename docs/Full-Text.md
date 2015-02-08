
# Full-Text
 


 
This article is part of the [XQuery Portal](XQuery.md). It summarizes the full-text and language-specific features of BaseX. 

 
Full-text retrieval is an essential query feature for working with XML documents, and BaseX was the first query processor that fully supported the [W3C XQuery Full Text 1.0](http://www.w3.org/TR/xpath-full-text-10/) Recommendation. 

 
## Introduction

The XQuery and XPath Full Text Recommendation (XQFT) is a feature-rich extension of the XQuery language. It can be used to both query XML documents and single strings for words and phrases. This section gives you a quick insight into the most important features of the language. 


This is a simple example for a basic full-text expression: 


    "This is YOUR World" contains text "your world"


It yields `true`, because the search string is _tokenized_ before it is compared with the tokenized input string. In the tokenization process, several normalizations take place. Many of those steps can hardly be simulated with plain XQuery: as an example, upper/lower case and diacritics (umlauts, accents, etc.) are removed and an optional, language-dependent stemming algorithm is applied. Beside that, special characters such as whitespaces and punctuation marks will be ignored. Thus, this query also yields true: 


    "Well... Done!" contains text "well, done"


The `occurs` keyword comes into play when more than one occurrence of a token is to be found: 


    "one and two and three" contains text "and" occurs at least 2 times


Varius range modifiers are available: `exactly`, `at least`, `at most`, and `from ... to ...`. 


### Combining Results

In the given example, curly braces are used to combine multiple keywords: 


    for $country in doc('factbook')//country
    where $country//religions[text() contains text { 'Sunni', 'Shia' } any]
    return $country/name


The query will output the names of all countries with a religion element containing `sunni` or `shia`. The `any` keyword is optional; it can be replaced with: 

 * `all` : all strings need to be found 
 * `any word` : any of the single words within the specified strings need to be found 
 * `all words` : all single words within the specified strings need to be found 
 * `phrase` : all strings need to be found as a single phrase 

The keywords `ftand`, `ftor` and `ftnot` can also be used to combine multiple query terms. The following query yields the same result as the last one does (but it takes [more memory](Full-Text.md#FTAnd)): 


    doc('factbook')//country[descendant::religions contains text 'sunni' ftor 'shia']/name


The keywords `not in` are special: they are used to find tokens which are not part of a longer token sequence: 


    for $text in ("New York", "new conditions")
    return $text contains text "New" not in "New York"


### Positional Filters

A popular retrieval operation is to filter texts by the distance of the searched words. In this query… 


    <xml>
      <text>There is some reason why ...</text>
      <text>For some good yet unknown reason, ...</text>
      <text>The reason why some people ...</text>
    </xml>//text[. contains text { "some", "reason" } all ordered distance at most 3 words]


…the two first texts will be returned as result, because there are at most three words between `some` and `reason`. Additionally, the `ordered` keyword ensures that the words are found in the specified order, which is why the third text is excluded. Note that `all` is required here to guarantee that only those hits will be accepted that contain all searched words. 


The `window` keyword is related: it accepts those texts in which all keyword occur within the specified number of tokens. Can you guess what is returned by the following query? 


    ("A C D", "A B C D E")[. contains text { "A", "E" } all window 3 words]


Sometimes it is interesting to only select texts in which all searched terms occur in the `same sentence` or `paragraph` (you can even filter for `different` sentences/paragraphs). This is obviously not the case in the following example: 


    '“I will survive!” This is what Mary told me.' contains text { 'will', 'told' } all words same sentence


Sentences are delimited by end of line markers (`.`, `!`, `?`, etc.), and newline characters are treated as paragraph delimiters. By the way: in the examples above, the `word` unit has been used, but `sentences` and `paragraphs` are valid alternatives. 


Last but not least, three specifiers exist to filter results depending on the position of a hit: 

 * `at start`  expects tokens to occur at the beginning of a text 
 * `at end`  expects tokens to occur at the text end 
 * `entire content`  only accepts texts which have no other words at the beginning or end 

### Match Options

As indicated in the introduction, the input and query texts are tokenized before they are compared with each other. During this process, texts are split into tokens, which are then normalized, based on the following matching options: 

 * If `case` is insensitive, no distinction is made between characters in upper and lower case. By default, the option is `insensitive`; it can also be set to `sensitive`: 

    "Respect Upper Case" contains text "Upper" using case sensitive

 * If `diacritics` is insensitive, characters with and without diacritics (umlauts, characters with accents) are declared as identical. By default, the option is `insensitive`; it can also be set to `sensitive`: 

    "'Äpfel' will not be found..." contains text "Apfel" diacritics sensitive

 * If `stemming` is activated, words are shortened to a base form by a language-specific stemmer: 

    "catch" contains text "catches" using stemming,
    "Haus" contains text "Häuser" using stemming using language 'de'

 * With the `stop words` option, a list of words can be defined that will be ignored when tokenizing a string. This is particularly helpful when the size of a full-text index structure needs to be reduced: 

    "You and me" contains text "you or me" using stop words ("and", "or"),
    "You and me" contains text "you or me" using stop words at "http://files.basex.org/etc/stopwords.txt"

 * Related terms such as synonyms can be found with the sophisticated [Thesaurus](Full-Text.md#Thesaurus) option. 

The `wildcards` option facilitates search operations similar to simple regular expressions: 

 * `.`  matches a single arbitrary character. 
 * `.?`  matches either zero or one character. 
 * `.*`  matches zero or more characters. 
 * `.+`  matches one or more characters. 
 * `.{min,max}`  matches _min_–_max_ number of characters. 

    "This may be interesting in the year 2000" contains text { "interest.*", "2.{3,3}" } using wildcards


This was a quick introduction to XQuery Full Text; you are invited to explore the numerous other features of the language! 

 
## BaseX Features

This page lists BaseX-specific full-text features and options. 


### Options

The available full-text index can handle various combinations of the match options defined in the XQuery Full Text Recommendation. By default, most options are disabled. The GUI dialogs for creating new databases or displaying the database properties contain a tab for choosing between all available options. On the command-line, the `SET` command can be used to activate full-text indexing or creating a full-text index for existing databases: 

 * `SET FTINDEX true; CREATE DB input.xml`
 * `CREATE INDEX fulltext`

The following indexing options are available: 

 * **Language** : [see below](Full-Text.md#Languages) for more details (`SET LANGUAGE EN`). 
 * **Stemming** : tokens are stemmed with the Porter Stemmer before being indexed (`SET STEMMING true`). 
 * **Case Sensitive** : tokens are indexed in case-sensitive mode (`SET CASESENS true`). 
 * **Diacritics** : diacritics are indexed as well (`SET DIACRITICS true`). 
 * **Stopword List** : a stop word list can be defined to reduce the number of indexed tokens (`SET STOPWORDS [filename]`). 

### Languages

The chosen language determines how the input text will be tokenized and stemmed. The basic code base and `jar` file of BaseX comes with built-in support for English and German. More languages are supported if the following libraries are found in the classpath: 

 * [lucene-stemmers-3.4.0.jar](http://files.basex.org/maven/org/apache/lucene-stemmers/3.4.0/lucene-stemmers-3.4.0.jar) : includes Snowball and Lucene stemmers and extends language support to the following languages: Bulgarian, Catalan, Czech, Danish, Dutch, Finnish, French, Greek, Hindi, Hungarian, Indonesian, Italian, Latvian, Lithuanian, Norwegian, Portuguese, Romanian, Russian, Spanish, Swedish, Turkish. 
 * [igo-0.4.3.jar](http://en.sourceforge.jp/projects/igo/releases/) : [An additional article](http://docs.basex.org/wiki/Full-Text:_Japanese) explains how Igo can be integrated, and how Japanese texts are tokenized and stemmed. 

The JAR files can also be found in the `zip` and `exe` distribution files of BaseX. 


The following two queries, which both return `true`, demonstrate that stemming depends on the selected language: 


    "Indexing" contains text "index" using stemming,
    "häuser" contains text "haus" using stemming using language "de"


### Scoring

The XQuery Full Text Recommendation allows for the usage of scoring models and values within queries, with scoring being completely implementation-defined. 


The scoring model of BaseX takes into consideration the number of found terms, their frequency in a text, and the length of a text. The shorter the input text is, the higher scores will be: 


    (: Score values: 1 0.62 0.45 :)
    for $text score $score in ("A", "A B", "A B C")[. contains text "A"]
    order by $score descending
    return <hit score='{ format-number($score, "0.00") }'>{ $text }</hit>


This simple approach has proven to consistently deliver good results, and in particular when little is known about the structure of the queried XML documents. 


Please note that scores will only be computed if a parent expression requests them: 


    (: Computes and returns a scoring value. :)
    let score $score := <x>Hello Universe</x> contains text "hello"
    return $score
    (: No scoring value will be computed here. :)
    let $result := <x>Hello Universe</x> contains text "hello"
    let score $score := $result
    return $score


With Version 8.0, scores will be propagated by the `and` and `or` expressions and in predicates. In the following query, all returned scores are equal: 


    let $text := "A B C"
    let score $s1 := $text contains text "A" ftand "B C"
    let score $s2 := $text contains text "A" ftand "B C"
    let score $s3 := $text contains text "A" and $text contains text "B C"
    let score $s4 := $text contains text "A" or $text contains text "B C"
    let score $s5 := $text[. contains text "A"][. contains text "B C"]
    return ($s1, $s2, $s3, $s4, $s5)


### Thesaurus

BaseX supports full-text queries using thesauri, but it does not provide a default thesaurus. This is why queries such as 


    'computers' contains text 'hardware'
      using thesaurus default


will return `false`. However, if the thesaurus is specified, then the result will be `true`: 


    'computers' contains text 'hardware'
      using thesaurus at 'XQFTTS_1_0_4/TestSources/usability2.xml'


The format of the thesaurus files must be the same as the format of the thesauri provided by the [XQuery and XPath Full Text 1.0 Test Suite](http://dev.w3.org/2007/xpath-full-text-10-test-suite). It is an XML with structure defined by an [XSD Schema](http://dev.w3.org/cvsweb/~checkout~/2007/xpath-full-text-10-test-suite/TestSuiteStagingArea/TestSources/thesaurus.xsd?rev=1.3;content-type=application%2Fxml). 


### Fuzzy Querying

In addition to the official recommendation, BaseX supports fuzzy querying. The XQFT grammar was enhanced by the FTMatchOption `using fuzzy ` to allow for approximate searches in full texts. By default, the standard [full-text index](Indexes.md) already supports the efficient execution of fuzzy searches. 


**Document 'doc.xml'**: 


    <doc>
       <a>house</a>
       <a>hous</a>
       <a>haus</a>
    </doc>


**Command:**`CREATE DB doc.xml; CREATE INDEX fulltext`


**Query:**


    //a[text() contains text 'house' using fuzzy]


**Result:**


    <a>house</a>
    <a>hous</a>


Fuzzy search is based on the Levenshtein distance. The maximum number of allowed errors is calculated by dividing the token length of a specified query term by 4, preserving a minimum of 1 errors. A static error distance can be set by adjusting the `LSERROR` property (default: `SET LSERROR 0`). The query above yields two results as there is no error between the query term “house” and the text node “house”, and one error between “house” and “hous”. 

 
## Performance

### Index Processing

BaseX offers different evaluation strategies for XQFT queries, the choice of which depends on the input data and the existence of a full text index. The query compiler tries to optimize and speed up queries by applying a full text index structure whenever possible and useful. Three evaluation strategies are available: the standard sequential database scan, a full-text index based evaluation and a hybrid one, combining both strategies (see [XQuery Full Text implementation in BaseX](http://www.inf.uni-konstanz.de/gk/pubsys/publishedFiles/GrGaHo09.pdf)). Query optimization and selection of the most efficient evaluation strategy is done in a full-fledged automatic manner. The output of the query optimizer indicates which evaluation plan is chosen for a specific query. It can be inspected by activating verbose querying (Command: `SET VERBOSE ON`) or opening the Query Info in the GUI. The message 


`Applying full-text index`


suggests that the full-text index is applied to speed up query evaluation. A second message 


`Removing path with no index results`


indicates that the index does not yield any results for the specified term and is thus skipped. If index optimizations are missing, it sometimes helps to give the compiler a second chance and try different rewritings of the same query. 


### FTAnd

The internal XQuery Full Text data model is pretty complex and may consume more main memory as would initially guess. If you plan to combine search terms via `ftand`, we recommend you to resort to an alternative, memory-saving representation: 


    (: representation via "ftand" :)
    "A B" contains text "A" ftand "B" ftor "C" ftor "D"
    (: memory saving representation :)
    "A B" contains text { "A", "B" } all ftor { "C", "D" } all

 
## Mixed Content

When working with so-called narrative XML documents, such as HTML, [TEI](http://tei-c.org/), or [DocBook](http://docbook.org) documents, you typically have _mixed content_, i.e., elements containing a mix of text and markup, such as: 


    <p>This is only an illustrative <hi>example</hi>, not a <q>real</q> text.</p>


Since the logical flow of the text is not interrupted by the child elements, you will typically want to search across elements, so that the above paragraph would match a search for “real text”. For more examples, see [XQuery and XPath Full Text 1.0 Use Cases](http://www.w3.org/TR/xpath-full-text-10-use-cases/#Across). 


To enable this kind of searches, _whitespace chopping_ must be turned off when importing XML documents by setting the option `CHOP` to `OFF` (default: `SET CHOP ON`). In the GUI, you find this option in _Database_ → _New…_ → _Parsing_ → _Chop Whitespaces_. A query such as `//p[. contains text 'real text']` will then match the example paragraph above. However, the full-text index will **not** be used in this query, so it may take a long time. The full-text index would be used for the query `//p[text() contains text 'real text']`, but this query will not find the example paragraph, because the matching text is split over two text nodes. 


Note that the node structure is completely ignored by the full-text tokenizer: The `contains text` expression applies all full-text operations to the _string value_ of its left operand. As a consequence, the `ft:mark` and `ft:extract` functions (see [Full-Text Functions](Full-Text Module.md)) will only yield useful results if they are applied to single text nodes, as the following example demonstrates: 


    (: Structure is ignored; no highlighting: :)
    ft:mark(//p[. contains text 'real'])
    (: Single text nodes are addressed: results will be highlighted: :)
    ft:mark(//p[.//text() contains text 'real'])


Note that BaseX does **not** support the _ignore option_ (`without content`) of the [W3C XQuery Full Text 1.0](http://www.w3.org/TR/xpath-full-text-10/#ftignoreoption) Recommendation. This means that it is not possible to ignore descendant element content, such as footnotes or other material that does not belong to the same logical text flow. Here is an example document: 


    <p>This text is provided for illustrative<note>Serving as an example or explanation.</note> purposes only.</p>


The ignore option would enable you to search for the string “illustrative purposes”: 


    //p[. contains text 'illustrative purposes' without content note]


For more examples, see [XQuery and XPath Full Text 1.0 Use Cases](http://www.w3.org/TR/xpath-full-text-10-use-cases/#Ignore). 


As BaseX does not support the ignore option, it raises error [FTST0007](XQuery Errors.md#Full-Text_Errors) when it encounters `without content` in a full-text `contains` expression. 

 
## Functions

Some additional [Full-Text Functions](Full-Text Module.md) have been added to BaseX to extend the official language recommendation with useful features, such as explicitly requesting the score value of an item, marking the hits of a full-text request, or directly accessing the full-text index with the default index options. 

 
## Collations

Version 8.0: See [XQuery 3.1](XQuery 3.1.md#XQuery_3.1Collations) for new official collation features. 


By default, string comparisons in XQuery are based on the Unicode codepoint order. The default namespace URI `http://www.w3.org/2003/05/xpath-functions/collation/codepoint` specifies this ordering. In BaseX, the following URI syntax is supported to specify collations: 


     http://basex.org/collation?lang=...;strength=...;decomposition=...


Semicolons can be replaced with ampersands; for convenience, the URL can be reduced to its _query string component_ (including the question mark). All arguments are optional: 


** Argument ** | ** Description **
-------------- | -----------------
`lang` |  A language code, selecting a Locale. It may be followed by a language variant. If no language is specified, the system’s default will be chosen. Examples: `de`, `en-US`. 
`strength` |  Level of difference considered significant in comparisons. Four strengths are supported: `primary`, `secondary`, `tertiary`, and `identical`. For example, in German, "Ä" and "A" are considered primary differences, "Ä" and "ä" are secondary differences, "Ä" and "A[&#x308;](http://www.fileformat.info/info/unicode/char/308/index.htm)" are tertiary differences, and "A" and "A" are identical. 
`decomposition` |  Defines how composed characters are handled. Three decompositions are supported: `none`, `standard`, and `full`. More details are found in the [JavaDoc](http://docs.oracle.com/javase/7/docs/api/java/text/Collator.html) of the JDK. 

**Some Examples:**

 * If a default collation is specified, it applies to all collation-dependent string operations in the query. The following expression yields `true`: 

    declare default collation 'http://basex.org/collation?lang=de;strength=secondary';
    'Straße' = 'Strasse'

 * Collations can also be specified in `order by` and `group by` clauses of FLWOR expressions. This query returns `à plutôt! bonjour!`: 

    for $w in ("bonjour!", "à plutôt!") order by $w collation "?lang=fr" return $w

 * Various string function exists that take an optional collation as argument: The following functions give us `a` and `1 2 3` as results: 

    distinct-values(("a", "á", "à"), "?lang=it-IT;strength=primary"),
    index-of(("a", "á", "à"), "a", "?lang=it-IT;strength=primary")

 
## Changelog
UNKNOWN * Updated: [Scores](Full-Text.md#Scoring) will be propagated by the `and` and `or` expressions and in predicates. 
UNKNOWN * Added: [Collations](Full-Text.md#Full-TextCollations) support. 
UNKNOWN * Removed: Trie index, which was specialized on wildcard queries. The fuzzy index now supports both wildcard and fuzzy queries. 
 * Removed: TF/IDF scoring was discarded in favor of the internal scoring model. 
