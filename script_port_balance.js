// Set your API key here
APIKEY1 = 'ckey_d81ab58d3ef748dba534888bbc1';

function getData_port_balance() {
  // Get key HTML elements and reset table content
  const ul = document.getElementById('metadata');
  const tableRef = document.getElementById('Portfolio_Balance').getElementsByTagName('tbody')[0];
  tableRef.innerHTML = "";

  total_balance = 0;

  // Covalent API request setup
  const address = document.getElementById('address').value || 'demo.eth';
  const chainId = document.getElementById('chain').value || '1';
  const url = new URL(`https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2`);
  url.search = new URLSearchParams({
    key: APIKEY1
  })

  // Use Fetch API to get Covalent data
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let tokens = data.data.items;
      // Update wallet metadata

      tokens.map(function (token) { // Map through the results and for each run the code below
        if (token.contract_decimals > 0) {
          balance = parseInt(token.balance) / Math.pow(10, token.contract_decimals);
        } else {
          balance = parseInt(token.balance);
        }

        total_balance = total_balance + parseFloat(token.quote);
      })

      return tableRef.insertRow().innerHTML = 
            `<td> $${parseFloat(total_balance).toFixed(2)} </td>`;
      
    })
}