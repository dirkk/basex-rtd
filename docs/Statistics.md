 


 
This article is part of the [Advanced User's Guide](Advanced User's Guide.md). It lists statistics on various XML instances that have been created with BaseX, with the value and full-text indexes turned off. The URLs to the original sources, if available or public, are listed below. 

 
# Databases 
 * FileSize is the original size of the input documents 
 * #Files indicates the number of stored XML documents 
 * #DbSize is the size of the resulting database (excluding the [value index structures](Indexes.md#Value_Indexes)) 
 * #Nodes represents the number of XML nodes (elements, attributes, texts, etc.) stored in the database 
 * #Attr indicates the maximum number of attributes stored for a single element 
 * #ENames and #ANames reflect the number of distinct element and attribute names 
 * #URIs represent the number of distinct namespace URIs 
 * Height indicates the maximum level depth of the stored nodes 

If a fixed database limit is reached, documents can be distributed in several database instances, which can then accessed from a single XQuery expression. 


**Instances ** | **FileSize ** | **#Files ** | **DbSize ** | **#Nodes ** | **#Attr ** | **#ENames ** | **#ANames ** | **#URIs ** | **Height **
-------------- | ------------- | ----------- | ----------- | ----------- | ---------- | ------------ | ------------ | ---------- | -----------
**Limits** | **512 GiB**(2^39 Bytes)  | **536'870'912**(2^29)  | _no limit_   | **2'147'483'648**(2^31)  | _no limit_   | **32768**(2^15)  | **32768**(2^15)  | **256**(2^8)  | _no limit_  
 RuWikiHist  | 421 GiB  | 1  | 416 GiB  | 324'848'508  | 3  | 21  | 6  | 2  | 6 
 ZhWikiHist  |  126 GiB  |  1  |  120 GiB  |  179'199'662  |  3  |  21  |  6  |  2  |  6 
 EnWiktionary  |  79 GiB  |  1  |  75 GiB  |  134'380'393  |  3  |  21  |  6  |  2  |  6 
 XMark  |  55 GiB  |  1  |  64 GiB  |  1'615'071'348  |  2  |  74  |  9  |  0  |  13 
 EnWikiMeta  |  54 GiB  |  1  |  52 GiB  |  401'456'348  |  3  |  21  |  6  |  2  |  6 
 MedLine  |  38 GiB  |  379  |  36 GiB  |  1'623'764'254  |  2  |  84  |  6  |  0  |  9 
 iProClass  |  36 GiB  |  1  |  37 GiB  |  1'631'218'984  |  3  |  245  |  4  |  2  |  9 
 Inex2009  |  31 GiB  |  2'666'500  |  34 GiB  |  1'336'110'639  |  15  |  28'034  |  451  |  1  |  37 
 CoPhIR  |  29 GiB  |  10'000'000  |  31 GiB  |  1'104'623'376  |  10  |  42  |  42  |  0  |  8 
 EnWikipedia  |  26 GiB  |  1  |  25 GiB  |  198'546'747  |  3  |  24  |  21  |  2  |  6 
 XMark  |  22 GiB  |  1  |  26 GiB  |  645'997'965  |  2  |  74  |  9  |  0  |  13 
 InterPro  |  14 GiB  |  1  |  19 GiB  |  860'304'235  |  5  |  7  |  15  |  0  |  4 
 Genome1  |  13 GiB  |  1  |  13 GiB  |  432'628'105  |  12  |  26  |  101  |  2  |  6 
 NewYorkTimes  |  12 GiB  |  1'855'659  |  13 GiB  |  280'407'005  |  5  |  41  |  33  |  0  |  6 
 TrEMBL  |  11 GiB  |  1  |  14 GiB  |  589'650'535  |  8  |  47  |  30  |  2  |  7 
 XMark  |  11 GiB  |  1  |  13 GiB  |  323'083'409  |  2  |  74  |  9  |  0  |  13 
 IntAct  |  7973 MiB  |  25'624  |  6717 MiB  |  297'478'392  |  7  |  64  |  22  |  2  |  14 
 Freebase  |  7366 MiB  |  1  |  10 GiB  |  443'627'994  |  8  |  61  |  283  |  1  |  93 
 SDMX  |  6356 MiB  |  1  |  8028 MiB  |  395'871'872  |  2  |  22  |  6  |  3  |  7 
 OpenStreetMap  |  5312 MiB  |  1  |  5171 MiB  |  6'910'669  |  3  |  19  |  5  |  2  |  6 
 SwissProt  |  4604 MiB  |  1  |  5422 MiB  |  241'274'406  |  8  |  70  |  39  |  2  |  7 
 EURLex  |  4815 MiB  |  1  |  5532 MiB  |  167'328'039  |  23  |  186  |  46  |  1  |  12 
 Wikicorpus  |  4492 MiB  |  659'338  |  4432 MiB  |  157'948'561  |  12  |  1'257  |  2'687  |  2  |  50 
 EnWikiRDF  |  3679 MiB  |  1  |  3537 MiB  |  98'433'194  |  1  |  11  |  2  |  11  |  4 
 CoPhIR  |  2695 MiB  |  1'000'000  |  2882 MiB  |  101'638'857  |  10  |  42  |  42  |  0  |  8 
 MeSH  |  2091 MiB  |  1  |  2410 MiB  |  104'845'819  |  3  |  6  |  5  |  2  |  5 
 FreeDB  |  1723 MiB  |  1  |  2462 MiB  |  102'901'519  |  2  |  7  |  3  |  0  |  4 
 XMark  |  1134 MiB  |  1  |  1303 MiB  |  32'298'989  |  2  |  74  |  9  |  0  |  13 
 DeepFS  |  810 MiB  |  1  |  850 MiB  |  44'821'506  |  4  |  3  |  6  |  0  |  24 
 LibraryUKN  |  760 MiB  |  1  |  918 MiB  |  46'401'941  |  3  |  23  |  3  |  0  |  5 
 Twitter  |  736 MiB  |  1'177'495  |  767 MiB  |  15'309'015  |  0  |  8  |  0  |  0  |  3 
 Organizations  |  733 MiB  |  1'019'132  |  724 MiB  |  33'112'392  |  3  |  38  |  9  |  0  |  7 
 DBLP  |  694 MiB  |  1  |  944 MiB  |  36'878'181  |  4  |  35  |  6  |  0  |  7 
 Feeds  |  692 MiB  |  444'014  |  604 MiB  |  5'933'713  |  0  |  8  |  0  |  0  |  3 
 MedLineSupp  |  477 MiB  |  1  |  407 MiB  |  21'602'141  |  5  |  55  |  7  |  0  |  9 
 AirBase  |  449 MiB  |  38  |  273 MiB  |  14'512'851  |  1  |  111  |  5  |  0  |  11 
 MedLineDesc  |  260 MiB  |  1  |  195 MiB  |  10'401'847  |  5  |  66  |  8  |  0  |  9 
 ZDNET  |  130 MiB  |  95'663  |  133 MiB  |  3'060'186  |  21  |  40  |  90  |  0  |  13 
 JMNEdict  |  124 MiB  |  1  |  171 MiB  |  8'592'666  |  0  |  10  |  0  |  0  |  5 
 XMark  |  111 MiB  |  1  |  130 MiB  |  3'221'926  |  2  |  74  |  9  |  0  |  13 
 Freshmeat  |  105 MiB  |  1  |  86 MiB  |  3'832'028  |  1  |  58  |  1  |  0  |  6 
 DeepFS  |  83 MiB  |  1  |  93 MiB  |  4'842'638  |  4  |  3  |  6  |  0  |  21 
 Treebank  |  82 MiB  |  1  |  92 MiB  |  3'829'513  |  1  |  250  |  1  |  0  |  37 
 DBLP2  |  80 MiB  |  170'843  |  102 MiB  |  4'044'649  |  4  |  35  |  6  |  0  |  6 
 DDI  |  76 MiB  |  3  |  39 MiB  |  2'070'157  |  7  |  104  |  16  |  21  |  11 
 Alfred  |  75 MiB  |  1  |  68 MiB  |  3'784'285  |  0  |  60  |  0  |  0  |  6 
 University  |  56 MiB  |  6  |  66 MiB  |  3'468'606  |  1  |  28  |  4  |  0  |  5 
 MediaUKN  |  38 MiB  |  1  |  45 MiB  |  1'619'443  |  3  |  21  |  3  |  0  |  5 
 HCIBIB2  |  32 MiB  |  26'390  |  33 MiB  |  617'023  |  1  |  39  |  1  |  0  |  4 
 Nasa  |  24 MiB  |  1  |  25 MiB  |  845'805  |  2  |  61  |  8  |  1  |  9 
 MovieDB  |  16 MiB  |  1  |  19 MiB  |  868'980  |  6  |  7  |  8  |  0  |  4 
 KanjiDic2  |  13 MiB  |  1  |  18 MiB  |  917'833  |  3  |  27  |  10  |  0  |  6 
 XMark  |  11 MiB  |  1  |  13 MiB  |  324'274  |  2  |  74  |  9  |  0  |  13 
 Shakespeare  |  7711 KiB  |  1  |  9854 KiB  |  327'170  |  0  |  59  |  0  |  0  |  9 
 TreeOfLife  |  5425 KiB  |  1  |  7106 KiB  |  363'560  |  7  |  4  |  7  |  0  |  243 
 Thesaurus  |  4288 KiB  |  1  |  4088 KiB  |  201'798  |  7  |  33  |  9  |  0  |  7 
 MusicXML  |  3155 KiB  |  17  |  2942 KiB  |  171'400  |  8  |  179  |  56  |  0  |  8 
 BibDBPub  |  2292 KiB  |  3'465  |  2359 KiB  |  80'178  |  1  |  54  |  1  |  0  |  4 
 Factbook  |  1743 KiB  |  1  |  1560 KiB  |  77'315  |  16  |  23  |  32  |  0  |  6 
 XMark  |  1134 KiB  |  1  |  1334 KiB  |  33'056  |  2  |  74  |  9  |  0  |  13 

## Sources 

** Instances ** | ** Source **
--------------- | ------------
 AirBase  | [http://air-climate.eionet.europa.eu/databases/airbase/airbasexml](http://air-climate.eionet.europa.eu/databases/airbase/airbasexml)
 Alfred  | [http://alfred.med.yale.edu/alfred/alfredWithDescription.zip](http://alfred.med.yale.edu/alfred/alfredWithDescription.zip)
 BibDBPub  | [http://inex.is.informatik.uni-duisburg.de/2005/](http://inex.is.informatik.uni-duisburg.de/2005/)
 CoPhIR  | [http://cophir.isti.cnr.it/](http://cophir.isti.cnr.it/)
 DBLP  | [http://dblp.uni-trier.de/xml](http://dblp.uni-trier.de/xml)
 DBLP2  | [http://inex.is.informatik.uni-duisburg.de/2005/](http://inex.is.informatik.uni-duisburg.de/2005/)
 DDI  | [http://tools.ddialliance.org/](http://tools.ddialliance.org/)
 EnWikiMeta  | [http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-meta-current.xml.bz2](http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-meta-current.xml.bz2)
 EnWikipedia  | [http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles.xml.bz2](http://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles.xml.bz2)
 EnWikiRDF  | [http://www.xml-benchmark.org/](http://www.xml-benchmark.org/) generated with xmlgen 
 EnWiktionary  | [http://dumps.wikimedia.org/enwiktionary/latest/enwiktionary-latest-pages-meta-history.xml.7z](http://dumps.wikimedia.org/enwiktionary/latest/enwiktionary-latest-pages-meta-history.xml.7z)
 EURLex  | [http://www.epsiplatform.eu/](http://www.epsiplatform.eu/)
 Factbook  | [http://www.cs.washington.edu/research/xmldatasets/www/repository.html](http://www.cs.washington.edu/research/xmldatasets/www/repository.html)
 Freebase  | [http://download.freebase.com/wex](http://download.freebase.com/wex)
 FreeDB  | [http://www.xmldatabases.org/radio/xmlDatabases/projects/FreeDBtoXML](http://www.xmldatabases.org/radio/xmlDatabases/projects/FreeDBtoXML)
 Freshmeat  | [http://freshmeat.net/articles/freshmeat-xml-rpc-api-available](http://freshmeat.net/articles/freshmeat-xml-rpc-api-available)
 Genome1  | [ftp://ftp.ncbi.nih.gov/snp/organisms/human_9606/XML/ds_ch1.xml.gz](ftp://ftp.ncbi.nih.gov/snp/organisms/human_9606/XML/ds_ch1.xml.gz)
 HCIBIB2  | [http://inex.is.informatik.uni-duisburg.de/2005/](http://inex.is.informatik.uni-duisburg.de/2005/)
 Inex2009  | [http://www.mpi-inf.mpg.de/departments/d5/software/inex](http://www.mpi-inf.mpg.de/departments/d5/software/inex)
 IntAct  | [ftp://ftp.ebi.ac.uk/pub/databases/intact/current/index.html](ftp://ftp.ebi.ac.uk/pub/databases/intact/current/index.html)
 InterPro  | [ftp://ftp.bio.net/biomirror/interpro/match_complete.xml.gz](ftp://ftp.bio.net/biomirror/interpro/match_complete.xml.gz)
 iProClass  | [ftp://ftp.pir.georgetown.edu/pir_databases/iproclass/iproclass.xml.gz](ftp://ftp.pir.georgetown.edu/pir_databases/iproclass/iproclass.xml.gz)
 JMNEdict  | [ftp://ftp.monash.edu.au/pub/nihongo/enamdict_doc.html](ftp://ftp.monash.edu.au/pub/nihongo/enamdict_doc.html)
 KanjiDic2  | [http://www.csse.monash.edu.au/~jwb/kanjidic2](http://www.csse.monash.edu.au/~jwb/kanjidic2)
 MedLine  | [http://www.nlm.nih.gov/bsd](http://www.nlm.nih.gov/bsd)
 MeSH  | [http://www.nlm.nih.gov/mesh/xmlmesh.html](http://www.nlm.nih.gov/mesh/xmlmesh.html)
 MovieDB  | [http://eagereyes.org/InfoVisContest2007Data.html](http://eagereyes.org/InfoVisContest2007Data.html)
 MusicXML  | [http://www.recordare.com/xml/samples.html](http://www.recordare.com/xml/samples.html)
 Nasa  | [http://www.cs.washington.edu/research/xmldatasets/www/repository.html](http://www.cs.washington.edu/research/xmldatasets/www/repository.html)
 NewYorkTimes  | [http://www.nytimes.com/ref/membercenter/nytarchive.html](http://www.nytimes.com/ref/membercenter/nytarchive.html)
 OpenStreetMap  | [http://dump.wiki.openstreetmap.org/osmwiki-latest-files.tar.gz](http://dump.wiki.openstreetmap.org/osmwiki-latest-files.tar.gz)
 Organizations  | [http://www.data.gov/raw/1358](http://www.data.gov/raw/1358)
 RuWikiHist  | [http://dumps.wikimedia.org/ruwiki/latest/ruwiki-latest-pages-meta-history.xml.7z](http://dumps.wikimedia.org/ruwiki/latest/ruwiki-latest-pages-meta-history.xml.7z)
 SDMX  | [http://www.metadatatechnology.com/](http://www.metadatatechnology.com/)
 Shakespeare  | [http://www.cafeconleche.org/examples/shakespeare](http://www.cafeconleche.org/examples/shakespeare)
 SwissProt  | [ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase](ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase)
 Thesaurus  | [http://www.drze.de/BELIT/thesaurus](http://www.drze.de/BELIT/thesaurus)
 Treebank  | [http://www.cs.washington.edu/research/xmldatasets](http://www.cs.washington.edu/research/xmldatasets)
 TreeOfLife  | [http://tolweb.org/data/tolskeletaldump.xml](http://tolweb.org/data/tolskeletaldump.xml)
 TrEMBL  | [ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase](ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase)
 Wikicorpus  | [http://www-connex.lip6.fr/~denoyer/wikipediaXML](http://www-connex.lip6.fr/~denoyer/wikipediaXML)
 XMark  | [http://www.xml-benchmark.org/](http://www.xml-benchmark.org/) generated with xmlgen 
 ZDNET  | [http://inex.is.informatik.uni-duisburg.de/2005/](http://inex.is.informatik.uni-duisburg.de/2005/)
 ZhWikiHist  | [http://dumps.wikimedia.org/zhwiki/latest/zhwiki-latest-pages-meta-history.xml.7z](http://dumps.wikimedia.org/zhwiki/latest/zhwiki-latest-pages-meta-history.xml.7z)
 LibraryUKN  |  generated from university library data 
 MediaUKN  |  generated from university library data 
 DeepFS  |  generated from filesystem structure 
 University  |  generated from students test data 
 Feeds  |  compiled from news feeds 
 Twitter  |  compiled from Twitter feeds 
