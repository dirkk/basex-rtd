 


 
This page will summarize first thoughts on annotation-based security/authentication support in BaseX. 

 
Annotation specification: 

 
(: Responsible for performing the login of an user, see sec:authenticate and sec:login functions in the security module :) **%sec:authenticate()**

 
(: The basic security annotation enforcing a authorization on method invocation.:) (: The literal defines a principal which must be assigned to the current logged in user :) (: If the authorization was not successfull the default authorization fallback is called. @see %sec:authorization-fallback() :) **%sec:requires-principal(string)**

 
(: The basic security annotation enforcing a authorization on method invocation.:) (: The first literal defines a principal which must be assigned to the current logged in user :) (: The second defines the fallback function which should be called if the authorization was not successful @see %sec:authorization-fallback(string) :) **%sec:requires-principal(string,string)**

 
(: Enforces an authentication but no authorization :) **%sec:requires-login()**

 
(: The default authorization fallback function. The function must not have any arguments :) (: relevant information like the current username might be available through additional xquery function in the security module :) **%sec:authorization-fallback()**

 
(: An authorization fallback function addressable for %sec:requires-principal(string,string) by given id. The function must not have any arguments :) (: relevant information like the current username might be available through additional xquery function in the security module :) **%sec:authorization-fallback(string)**

 
(: The default authentication fallback function. The function must not have any arguments :) **%sec:authentication-fallback()**

