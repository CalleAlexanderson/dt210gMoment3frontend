## Blogg

Jag har använt react samt react dom för att skapa en single page application i react, webbplatsen är en blogg som består av 7 undersidor. 3 av undersidorna är skyddade och kräver att användaren loggar in för att besöka, detta görs genom ett JWT token som skickas till och från sidans backend. 


Av de 4 undersidor som inte kräver inloggning är en startsidan, en är sidan med alla blogginlägg, en är sidan som användaren kommer till om de klickar på att läsa mer på någon av blogginläggen och på sidan 
laddas blogginläggets innehåll in från en databas och skickas med backend och den sista sidan är där användaren loggar in, logga in sidan har ingen länk till sig men istället skickas användaren dit om hen försöker besöka admin sidan innan hen loggat in.

De 3 skyddade undersidorna består av admin sidan där användaren kan lägga till, redigera samt ta bort blogginlägg. De andra två undersidorna används för att lägga till och redigera inlägg.


