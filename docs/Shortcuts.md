
# Shortcuts
 


 
This page is part of the [Getting Started](Getting Started.md) Section. It gives you an overview of the hotkeys available in the GUI of BaseX. 

 
## Editor

### Editor Shortcuts

The text editor can be used to create, edit, save and execute XQuery expressions, XML documents and any other textual files. 


#### Custom Editing 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Performs [Code Completions](Shortcuts.md#Code_Completions) | Ctrl Space  | Ctrl Space 
Sort lines  | Ctrl U  | ⌘ U 
Format code (experimental)  | Ctrl Shift F  | ⌘ Shift F 
(Un)comment selection/line  | Ctrl K  | ⌘ K 
Delete complete line  | Ctrl Shift D  | ⌘ Shift D 

#### Standard Editing 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Undo recent changes  | Ctrl Z  | ⌘ Z 
Redo recent changes  | Ctrl Y  | ⌘ Shift Z 
Cut selection  | Ctrl XCtrl Delete  | ⌘ X 
Copy selection to clipboard  | Ctrl CCtrl Insert  | ⌘ C 
Paste from clipboard  | Ctrl VShift Insert  | ⌘ V 
Select All  | Ctrl A  | ⌘ A 
Delete character left of cursor  | Backspace  | Backspace 
Delete character right of cursor  | Delete  | Delete (fn Backspace) 
Delete word left of cursor  | Ctrl Backspace  | Alt Backspace 
Delete word right of cursor  | Ctrl Delete  | Alt Delete 
Delete text left of cursor  | Ctrl Shift Backspace  | ⌘ Backspace 
Delete text right of cursor  | Ctrl Shift Delete  | ⌘ Delete 

  
#### Finding 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Jump to next error  | Ctrl . (period)  | ⌘ . (period) 
Jump to currently edited file  | Ctrl J  | ⌘ J 
Go to line  | Ctrl L  | ⌘ L 
Find and replace text  | Ctrl F  | ⌘ F 
Find next instance of text  | F3Ctrl G  | ⌘ F3⌘ G 
Find previous instance of text  | Shift F3Ctrl Shift G  | ⌘ Shift F3⌘ Shift G 

#### Navigation 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Move one character to the left/right  | ←/→  | ←/→ 
Move one word to the left/right  | Ctrl ←/→  | Alt ←/→ 
Move to beginning/end of line  | Home/End  | ⌘ ←/→ 
Move one line up/down  | ↑/↓  | ↑/↓ 
Move one screen-full up/down  | Page ↑/↓  | Page ↑/↓ (fn ↑/↓) 
Move to top/bottom  | Ctrl Home/End  | ↖/↘ (⌘ ↑/↓) 
Scroll one line up/down  | Ctrl ↑/↓  | Alt ↑/↓ 

#### Code Completions
 The GUI editor provides various code completions, which simplify the authoring of complex XQuery applications. Opening elements, comments, quotes or brackets will automatically be closed, and new lines will automatically be indented. If the [shortcut](Shortcuts.md#Editor_Shortcuts) for code completions is pressed (Ctrl Space), the keys listed in the following table will be replaced with their corresponding values. An underscore indicates where the cursor will be placed after the replacement: 


**Key** | **Value**
------- | ---------
`..` | `parent::node()`
`.` | `self::node()`
`//` | `/descendant-or-self::node()/`
`/` | `root()`
`@` | `attribute`
`an` | `ancestor::`
`as` | `ancestor-or-self::`
`copy` | `copy $_ := modify return `
`cr` | `&xD;`
`ch` | `child::`
`ct` | `contains text`
`de` | `descendant::`
`ds` | `descendant-or-self::`
`declnl` | `declare option output:item-separator "&#xA;";`
`declns` | `declare namespace _ = "";`
`delete` | `delete node _`
`dump` | `prof:dump(_)`
`fo` | `following::`
`for` | `for $_ in return `
`fs` | `following-sibling::`
`function` | `declare function _() {  };`
`group` | `group by $_`
`import` | `import module namespace _ = "";`

  
**Key** | **Value**
------- | ---------
`insert` | `insert node _ into `
`let` | `let $_ := return `
`module` | `module namespace _ = "";`
`nl` | `&xA;`
`ns` | `namespace`
`order` | `order by _`
`pa` | `parent::`
`pr` | `preceding::`
`ps` | `preceding-sibling::`
`rename` | `rename node _ as `
`replace value` | `replace value of node _ with `
`replace` | `replace node _ with `
`some` | `some $_ in satisfies `
`switch` | `switch(_)  case return   default return `
`tab` | `&#x9;`
`trace` | `trace(_ , 'Info: ')`
`try` | `try {  _} catch * {  }`
`typeswitch` | `typeswitch(_)  case return   default return `
`variable` | `declare variable $_ := ;`

#### GUI

#### Global Shortcuts 
 The following shortcuts are available from most GUI components: 


**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Jump to input bar  | F6  | ⌘ F6 
Jump to next/previous panel  | Ctrl (Shift) Tab  | Ctrl (Shift) Tab 
Increase/Decrease font size  | Ctrl +/-  | ⌘ +/- 
Reset font size  | Ctrl 0  | ⌘ 0 

  
**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Browse back/forward  | Alt ←/→Backspace  | ⌘ ←/→ 
Browse one level up  | Alt ↑  | ⌘ ↑ 
Browse to the root node  | Alt Home  | ⌘ Home 

#### Menu Shortcuts 
 The following commands and options are also linked from the main menu: 


#### Database 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Create new database  | Ctrl N  | ⌘ N 
Open/manage existing databases  | Ctrl M  | ⌘ M 
View/edit database properties  | Ctrl D  | ⌘ D 
Close opened database  | Ctrl Shift W  | ⌘ Shift W 
Exit application  | Ctrl Q  | ⌘ Q 

#### Editor 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Create new tab  | Ctrl T  | ⌘ T 
Open existing file  | Ctrl O  | ⌘ O 
Save file  | Ctrl S  | ⌘ S 
Save copy of file  | Ctrl Shift S  | ⌘ Shift S 
Close tab  | Ctrl W, Ctrl F4  | ⌘ W, ⌘ F4 

#### View 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Toggle query/text editor  | Ctrl E  | ⌘ E 
Toggle project structure  | Ctrl P  | ⌘ P 
Find files  | Ctrl H  | ⌘ Shift H 
Toggle result view  | Ctrl R  | ⌘ R 
Toggle query info view  | Ctrl I  | ⌘ I 

  
#### Options 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Open preference dialog  | Ctrl Shift P  | ⌘ , (comma) 

#### Visualization 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Toggle map view  | Ctrl 1  | ⌘ 1 
Toggle tree view  | Ctrl 2  | ⌘ 2 
Toggle folder view  | Ctrl 3  | ⌘ 3 
Toggle plot view  | Ctrl 4  | ⌘ 4 
Toggle table view  | Ctrl 5  | ⌘ 5 
Toggle explorer view  | Ctrl 6  | ⌘ 6 

#### Help 

**Description** | **Win/Linux** | **Mac**
--------------- | ------------- | -------
Show Help  | F1  | F1 

 Additionally, the names of HTML entities will be converted to their Unicode representation (as an example, `Auml` will be translated to `ä`). 


### Changelog
UNKNOWN * Added: Sort lines (Ctrl-U) 
UNKNOWN * Added: [Code Completions](Shortcuts.md#Code_Completions), Project (Ctrl P), Find Files (Ctrl Shift F) 
UNKNOWN * Added: go to line (Ctrl F) 
UNKNOWN * Added: delete complete line (Ctrl Shift D), jump to highlighted error (Ctrl .) 
