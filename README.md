
<h1>DON'T PANIC - DOCUMENTATION </h1>
<h2>THE CONCEPT</h2>
<p>‘’Don’t panic, Earth issue’’ is a magazine inspired by the ‘’Hitchhikers Guide for the galaxy’’ world. The Guide was originally conceived by Douglas Adams in 1978 as a BBC radio comedy, and then published as “a trilogy in five parts” from 1979 to 1992 and inspired films, tv series and other formats, all sharing the same comedy-sci-fi-surrealistic approach. The Guide also inspired festivities such as the Towel Day (4/2) and a significant amount of inside jokes. </p>
<p>The themes and tones of this website are borrowed from the book, publishing articles from the real world with the critical point of view of the fictional opera. </p>
<p>The title and the scenario behind the magazine take inspiration from the destruction of Earth happening in the novel: we used this as a starting point for imagining the publication of a collection of articles covering earthly issues from intergalactic publishers, namely “Deep Thoughts", “Magratears” and "Vogueon”. </p>
<ul>
 <li><b>Magratears</b> is an issue covered by the people of Magrathea, a planet devoted to luxury-planets design, where Earth was crafted and created, as a tribute for its forever lost wonders, which represent a great loss in the planet’s production portfolio;</li>
 <li><b>Deep thoughts’s</b> issue is covered by multidimensional beings (also known as lab rats) in the attempt to recollect the memory of the iper-computer Earth (our planet) and formulate the right question to which 42, the outcome provided by the super-computer Deep Thought to the fundamental question, could be a meaningful answer.The themes covered by this issue are the questions that we human (computer components built to formulate the question) ask ourselves regarding life and the universe , especially the ‘’most creative ones’’. </li>
 <li><b>VOGUEON </b>is an issue inspired by the Vogon race, which has the main characteristics of being very ugly, very attached to bureaucracy and able to develop the third worst poetry in the entire universe. The articles cover issues related to Earth poetry particularly appreciated by Vogon. </li
</ul>
 
<p>Since we are moving through the universe of the Guide, we are fueling our magazine with an Infinite Probability Drive. That said we could be anywhere in space and time simultaneously, and that is why readers will have the chance to move in the time lenses offered by the website and observe different moments of Earth’s history. </p>
  <h2>LLL FRAMEWORK</h2> 
<p>The purpose of this website is to display 3 different issues, each containing three articles, to be visualized side by side or one at a time.</p>  
<p>We have two main aims: the first is to visualize the website and display the different articles through the lens of historical typographical layouts, while the latter is to allow users to compare metadata relative to their content. </p> 
<p>The general idea behind the resource is to allow a simultaneous visualization and discovery of the articles, easing the comparation of their content and providing the user a journey through the lenses of typography. </p>
  <h3>The articles and the typographical styles </h3>
<p>In order to allow such exploration, we implemented an AJAX structure: the articles are in fact .txt files that, following the request of the user, are fetched in the page and positioned in a structure from 1 to 3 columns wide. The columns are a total of 6 (1 +2 +3) and, depending on how many articles need to be visualized simultaneously the div containing the right number of columns is displayed while the other two are “hidden”: each article is independently scrollable and issues can be switched in any given moment maintaining the number of articles displayed unchanged. Also, the sources of the articles are instantiated in the sidebar next to the titles. To achieve so we used a JSON file containing the .txt files names, the titles of the articles and their sources. </p> 
<p>A script to switch between different stylesheets (in the number of six) has also been created, which, without reloading the page, adds the script corresponding to the selected CSS below the predefined style, applying in this way the "lens” to the page. Lenses are also portable from one page to another, meaning they will last as long as the user does not change them. </p>
  <h2>The metadata </h2>
  <p>The articles metadata are also displayed using Javascript and JQuery.</p>  
<p>Once the articles are fetched in the page a script is run: first it selects directly from the text the general metadata relative to every article (author, date of publication, etc...) and then, the same function, proceeds to search in the text for the issue-specific metadata. This has been obtained by a previous metadatation of concepts of interest directly in the HTML of the text. The whole structure was tought to allow a fast and functional addition of issues\articles simply by being compliant to the metadatation standard and adding the proper records to the JSON file. </p>
 
The Articles Markup 
The markup of the articles followed our specific needs for the project. First, we marked-up the structural components of the documents, such as titles and paragraphs, referring more to the visualization needs than to the contents, and paying attention to the elements that would show particular needs for the different typographical styles. 
We then added semantic markup, in order to highlight the metadata present in the text and make them easily extractable. Each metadata relies inside a span and carries his own id, a class "mention” followed by his specific identifier class, an attribute about and a data-label, which are of particular importance for "concepts”.  
The classification for the metadata works with 5 main categories (Places, People, Concepts, Dates and Organizations) 4 of which are the same within the issues, while the subclasses of the Concepts categories will be treated differently for each issue, to support a higher precision in research and comparison.  
The organization is the following: 
Places are identified within the tag <span id="ID" class="mention place" about="SIGNIFICANT NAME " data-label="DISPLAYED NAME" data-wikidata-id="WIKIDATA IDENTIFIER">Earth</span> 
Concepts are identified differently from issue to issue 
Organizations are identified within the tag:  <span class="credit"><span id="ID" class="mention organization" about="ORGANIZATION NAME" data-label="DISPLAYED NAME">Getty Images </span></span> 
People are identified within the tag: <span id="ID" class="mention person" about="PERSON NAME" data-label="DISPLAYED NAME ">Michael Marshall</span> 
Dates are identified within the tag: <span id="ID" class="mention date" about="DATE" data-label="DISPLAYED DATE">2013</span> 
For what regards Concepts, the attribute about serves as a wider categorization, while the data-label carries the specific information about the meaning of the metadata. For example, in the Deep Thoughts issue we can find, among others: 
Scientifically and Not Scientifically Supported Theories: <span id="ID" class="mention concept" about="theories" data-label="Hollow Earth">hollow earth belief</span> 
Ideas Belonging to Theories: <span id="ID" class="mention concept" about="ideas" data-label="Bible ">the world is 6,000 years old and created in seven days as for the Bible</span> 
This serves just as an example of the logic applied to Concepts categorization: reporting the whole structure implied for every issue here will be useless since we worked towards the use of self-explanatory conceptualizations. 
TYPOGRAPHIC STYLES 
-1300 
Typographic style in the middle age 
BACKGROUND 
Layout design appeared on the pages of manuscripts in the medieval time well before the emergence of typesetting and printing. A scribe hand-copied an entire book composed very often in a beautifully designed layout. Many scribes were monks who would complete the task of writing a book, usually made from vellum, in a year or so. In fact, monasteries produced most of books until the 13th century. But as literacy diffused among the populace, and major universities were expanding, secular scribes outside the monasteries began to take up the work of bookmaking to increase the supply of written material. 
 
When each script was finished, it was decorated with an artist’s ornamental design—known as illumination. The composition of these layouts most often were surprisingly modern, using various page format, with different number of columns, applying artistically composed lettering in harmonic colors and variations in letter size for emphasis. After the invention of the printing press, the first printed page layouts were modeled on the manuscript layouts. But over time one major difference was introduced—justified setting. In this, spaces between words in continuous text are adjusted in each line so that columns align on both left and right sides. Although manuscript pages were symmetrical when viewed as spreads, the ranged-left lettering made them essentially asymmetric.There isn’t a specific layot for medieval manuscripts, some were justified some not,  
-1300 
This web page layout is inspired to the design of a manuscript of the XIV century even if the standardization of layout design as we know it today started with the emergence of the printed book, and no universal rule is followed in the production of manuscripts it’s easy to recognize common tendencies and recurring structures. 
The page layout is characterized by small paragraphs of text, a wide margin is left under and between, this space can be left empty but is often filled by miniatures. 
The distinction between paragraphs of text is usually not signaled by an empty space, but the starting letter of the first line is bigger than the rest and differently colored. 
Headers can be recognized by a different color (usually red), bigger font size, and by the first letter often beautifully miniated and taking up to half the space dedicated to the text. 
Article display 
On the web page dedicated to the article display we used a filter to recreate the effect of parchment on the boxes where text is shown and we deleted most of the spacing between paragraphs. 
 Since manuscripts are handwritten we choose to use a single font, modifying only the size and color, for all the written text : Candlebright that we thought was most similar to the hand-writing style used by the copyists. 
The second font xxxxx is used exclusively on the first letter of headers and on the first letter of the first word of every paragraph to reproduce the elaborate drop caps. 
The Headers also decorated with a drop-cap are a deep red that simulates the rich inks used for miniatures. 
To recreate the manuscript layout we used a different visualization depending on the number of the issue’s articles showed in the web page: 
When two articles are shown side by side we used ample margins on the left of the left article and on the right of the right article so the text is pushed on the upper-central part of the displaying area to suggest the idea of an open manuscript, a similar effect is obtained with two column when a single article is displayed. 
We decided to maintain a smallest margin when three articles are shown one beside the other to not impair readability. 
archive, menus, and cover page 
For the style used in the archive, menus, and cover page we have been more liberal with the layout, I choose a palette of gold and blue inspired miniatures of starry skies, used the page icon to simulate a miniature in the cover page, and proceeded to use golden color fonts to give the idea of a precious miniated volume. 
 
LAYOUTS 
-red ink for titles  
-no spacing between paragraph 
-drop caps 
-red and gold ink 
-  
PALETTE 
SOURCES 
 
-1800 
This web page layout is inspired by daily newspapers of the 19th century 
The invention of the steam powered press, in 1812, made it possible to print over a thousand copies of a page per hour, this began to make newspapers available to a mass audience (which in turn helped spread literacy), and from the 1820s changed the nature of book production, forcing a greater standardization in titles and other metadata. 
The newspaper printed in this period are mass produced, characterized by a dense disposition of the text across multiple columns in the same page, with lesser line height and smaller margins.  
The name of the newspaper at the top of the page is often characterized by wide, gothic and elaborate fonts, while the article titles are fond in various different fonts. 
Many stylistic choices were influenced by the need to optimize the use of paper and the dramatic presence of advertisements, which where necessary for the economy of the journals. 
Cover page 
The ads of these period often show big illustrations and extravagant fonts, the cover page of the website is freely inspired by one of those, with a vertical layout and an eye-catching illustration (the web-page logo) 
Article visualization page 
We choose xxxxxx a decadent font for the headers very similar to the ones used at the time for the newspaper’s names, a more modest font for the smaller headers(xxxxx) inspired by the article headers, and a classic serifed font for the text (times new roman). 
To reproduce the tall and numerous columns of text used in newspapers layout I divided the text in two column when two articles are visualized side by side (four column in total), and in four when only an article is visualised. 
We kept a small line height and small margins to imitate the crowded pages of the period. 
palette 
Finally, we kept the palette exclusively black and white and applied a filter to desaturate the pictures, while coloured print was available in the late 1800 only specialized magazines used colour print for illustrations, while daily newspapers where optimized to be cheap and produced quickly and where usually colourless. 
 
 
1930 - Futurism 
Background 
The 1930s was a fascinating era: on one side, there was great growth for culture, music, literature, and the arts; but on the other hand, it was a depressing time marked by unemployment, political turmoil, and the looming threats of WWII. There were also plenty of political movements, including the spread of populist ideas as well as the beginnings of World War II.  
The futurism is from its first moment tendent towards the embracing of new experiences and innovations favored by technique improvement and technology development: new printing techniques such as the screen printing and spirit duplicator were introduced from the beginning of 1900’ and factory produced movable type gained popularity increasing publishing efficiency. 
The periodic “ Futurismo”, which is not part of the clandestine phenomenon which diffused in that period in Italy, was first born in Rome in 1932 from the mind of Mino Somenzi, who was in touch with the futurist movement from 1913. The paper will stay in print until number 59 in 1933. 
First born as a 15day periodic of 50x32, 12 pages each, from 1932 the format increases notably to 64x43 and the periodical starts to come out once a week. 
The issues treated from the paper, ideologically close to the Futurist movement, included a wide variety of themes from architecture to theatre, from music to pedagogy and also poetry, cuisine and arts. 
Layout 
For what regards fonts and typographical styles, in futurism we assist to a backlash of previous typographical styles, an increasing in popularity of sans-serif fonts and small variations in stroke heights.  The Futura sans-serif style, employed in the website for the article body, was created during that period (1927). Other fonts used in this style are all sans-serif and include the planet-n-compact and the PreussicheAusgabe, chosen for the similarity with the Futurism ones reported in the images below. 
 
Also for the background of the page we decided to recall the Futurism artistic movements with two artworks, namely "Reaching the Sun” from Tullio Cralli and “The city that raises” from Umberto Boccioni: the first inspired the background colours while the second is recalled by the movement of the "stars". This choice was made in order to highlight the concept of movement and dynamism, central for Futurism, which we tried to obtain in the background of the page which is faster and more colorful than any other style. 
 
 
Colours 
The main colours of this style are pure red, black and white, in order to replicate as close as possible the palette of Futurism's magazines. The background of the pages is realized in a smooth yellow, to recall the paper quality of the period. The background of the website takes the colors of Cralli’s artworks, with a gradient from yellow to white and then blue and a set of moving lines in the tones of Boccioni’s work.  
 
1980 
80’s fonts and typographic styles were heavily influenced by the advancement of technology, and diffusion of videogames, the upcoming genre of music of the times. 
Magazine covers from this period are colorful, crowded and excessive.   
These fonts in particular have a futuristic style, heavy, sans-serif, commonly use neon aesthetics, gradients and mirrored sheen effect. 
This stylesheet main inspiration in the magazine Omni, science and science fiction magazine published between 1978 and 1995 in the US and the UK, It contained articles on science, parapsychology, and short works of science fiction and fantasy.  
 
 
Logo e bottoni usano omni font face (alternativa gratuita - Artista-Pro) Testi con Verdana, pretende linea gutter top, Prima lettera 
 
The palette of the backgrownd page take inspiration from the cover of the xxx number, the Logo an buttons use the same font used for headers in the magazine, (the free to use alternative)  
The font for the text body Verdana, sans serif lean and clear very similar to the onesused in omni. 
 
 
 
 
The mettadata menu viewer take inspitraation by the back cover, with white text against black background, while the article viewers take inspiration by the minimalistic but bold and futuristic impagination in the magazine with lean font for the titles and thick text interlines to divide paragraphs. 
 
The palette take inspiration by illustration found in the magazine, and the background colors in particular reproduce the xxxx year month cover. 
 
 
 
 
  
 
 
2000 - Youngsters Magazines  
Background 
The period spanning from 1990 to 2000 is clearly a flow, more than a breaking point signed by the turning of the millennium. The world is still experiencing economic growth and economies around the world are becoming more and more interconnected with a strong jump ahead in the globalization process. The invention of the WWW is finally blossoming into social networking and blogs, with the birth of Twitter and Facebook at the beginning of the century. 
The popular culture of this period can be considered iconic for the fast switching in trends and the unpredictable growth and decade of icons: especially for young people, following the latest news and trends, magazines become a way to keep on track with their favorite celebrities before finally and inevitably switching to social medias.  
Layout 
For the 90s and early 2000s we took inspiration from Teen People, the youngsters version of "People” published from 1988 to 2006, and J-14 founded in 1998 which in 2007 was found to have been read from one American girl out of three from Experian Simmon Research, Florida. We chose to focus on the issues of 2000's. 
 
We wanted to highlight the sparkling and colorful side of early 2000's publication, focusing on pink and purple shades that were particularly diffused in magazines devoted to teens, nonetheless sticking to the faint tint of fashion magazines paper for the articles background. 
 
The titles of the articles are in lowercase, to recall the typographical style of the magazines of the period. The font used for the title is the same as the one employed by “Teen People” and is called Egyptienne. For the subtitles we used Ginger, a font particularly used in the 2000, a typical Swiss sans serif, with a twirky geometric twist. 
The text uses Faustina fonts in bold, regular and italic variations for different sections (e.g. text, captions and emphasized parts): Faustina was designed by Alfonso Garcia for editorial typography (books, newspapers and magazines) in print and online and is a serif font. 
The body of the articles is displayed in 1, 2 or 3 columns, depending on the number of articles on the page, to recall the pagination of the magazines themselves. 
 
Colours 
The colours chosen for this style are meant to recall the pagination of teen magazines, with a particular hint for press devoted to young girls. We chose colours from the pink and purple palette, with a splash of "sugar paper” blu and black and white for titles and paragraphs. The articles background color is meant to recall the paper tone of such magazines. The palette was extrapolated from the observation of magazine covers. 
 
The Future 
What’s more futuristic than the temporal end of the Universe itself? Easy, Milliways!  
Milliways is a restaurant placed just a millisecond before the end of everything as we know it, offering a first-row seat for the gnaB giB just before the dessert.  
The restaurant building resembles a giant glittering starfish and is described as an intergalactic diner, situated at the end of time and matter: it has some of the most extravagant décor ever seen and serves a particularly good Pan Galactic Gargle Blaster. 
The layout 
We decided to develop our stylesheet following the aforementioned scenario: a user would expect from the end of the universe something resembling a futuristic diner menu, with neon colours, smooth angles and glittering, visible items in the page.  
For this reasons........
