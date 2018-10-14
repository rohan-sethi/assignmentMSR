# assignment
Art competition 

## Installation 
 * clone or download repo
 * run npm install ( Admin priviliges required for 'hdkey' npm )
 * Port : 3001 on local host
 
 ## Contract
  
  [Contract for Art Gallery](https://kovan.etherscan.io/address/0x1332213979286792b7023ef347308768904c7ef1#code)
  
  ## pages
  
  * open `http://localhost:3001/static/admin/index.html` for admin view
  * admin selects art from the list avaiable on admin page
  * open `http://localhost:3001/static/admin/registerartist.html#` to register artist
  * open `http://localhost:3001/static/admin/voteartest.html#` to vote for artist
  * pages are hosted statically on node server
  * Admin need to enter a Mnemonic password to execute transaction. For convenience the password is displayed on the page. 
  
  ## Assumptions
  
  * Email is unique and valid
  * In case of tie, the early participant gets the award
  * The modifires for voting and distribute award functions are commented out for fast execution
  * Person can only vote once per address & Admin cannot vote (modifier commented out)
  * Admin calls `declareArtistAward()` function to get winner
  * Contract uploader specifies the block number parameters upon deployment for registeration & voting `(9999999,9999999)` current
  * Running on kovan-test network for fast execution
  
  
 
