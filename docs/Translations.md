 


 
This page is part of the [Developer Section](Developing.md). It describes how to translate BaseX into other (natural) languages. 

 
Thanks to the following contributors, BaseX is currently available in 10 languages: 

  * **Dutch** : Huib Verweij 
 * **English** : BaseX Team 
 * **French** : Maud Ingarao 
 * **German** : BaseX Team 
 * **Hungarian** : Kiss-Kálmán Dániel 
 * **Indonesian** : Andria Arisal 
 * **Italian** : Massimo Franceschet 
 * **Japanese** : Toshio HIRAI and Kazuo KASHIMA 
 * **Mongolian** : Tuguldur Jamiyansharav 
 * **Romanian** : Adrian Berila 
 * **Russian** : Oleksandr Shpak and Max Shamaev 
 * **Spanish** : Carlos Marcos 
 
It is easy to translate BaseX into your native language! This is how you can proceed: 

 
# Working with the sources

If you have downloaded all BaseX sources via [Eclipse](Developing with Eclipse.md) or [Git](Git.md), you may proceed as follows: 


All language files are placed in the `src/main/resources/lang` directory of the main project: 

1. Create a copy of an existing translation file (e.g., `English.lang`) and rename it to your target language (e.g. `Hawaiian.lang`) 
2. Enter your name and contact information in the second line 
3. If you are using Eclipse, refresh the project (via _Project_ → _Refresh_); if you are using Maven, type in `mvn compile`. Your new language file will be automatically detected. 
4. Start the BaseX GUI, choose your language via _Options_ → _Preferences..._ and close the GUI 
5. Translate the texts in your language file and restart BaseX in order to see the changes 
6. Repeat the last step if you want to revise your translations 

## Updating BaseX.jar

You may directly add new languages to the JAR file. JAR files are nothing else than ZIP archives, and all language files are placed in the `lang` directory int the JAR file: 

1. Unzip an existing translation file (e.g., `English.lang`) and rename it to your target language (e.g. `Hawaiian.lang`) 
2. Enter your name and contact information in the second line and translate the texts 
3. Update your JAR file by copying the translated file into the zipped `lang` directory. Your new language file will be automatically detected. 
4. Start BaseX.jar, choose your language via _Options_ → _Preferences..._ and restart BaseX to see the changes 

You may also change the language in the `.basex` configuration file, which is placed in your [home directory](Configuration.md). In order to see where the all text keys are used within BaseX, you may temporarily set the [LANGKEY](Options.md#langkey) option to `true`. 

