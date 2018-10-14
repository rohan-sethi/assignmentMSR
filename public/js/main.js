var contractAbi = [{ "constant": !1, "inputs": [{ "name": "name", "type": "string" }, { "name": "email", "type": "string" }, { "name": "url", "type": "string" }, { "name": "aaddress", "type": "address" }], "name": "artistEntry", "outputs": [], "payable": !0, "stateMutability": "payable", "type": "function" }, { "constant": !1, "inputs": [{ "name": "index", "type": "uint256" }], "name": "checkArtist", "outputs": [], "payable": !1, "stateMutability": "nonpayable", "type": "function" }, { "constant": !1, "inputs": [], "name": "declareArtistAward", "outputs": [], "payable": !1, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "endBlockNoCompetition", "type": "uint256" }, { "name": "endBlockNoVoting", "type": "uint256" }], "payable": !1, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": !1, "inputs": [{ "name": "email", "type": "string" }], "name": "voteArtist", "outputs": [], "payable": !1, "stateMutability": "nonpayable", "type": "function" }, { "constant": !0, "inputs": [{ "name": "", "type": "uint256" }], "name": "artist", "outputs": [{ "name": "name", "type": "string" }, { "name": "email", "type": "string" }, { "name": "url", "type": "string" }, { "name": "artistAddress", "type": "address" }, { "name": "isValid", "type": "bool" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [], "name": "endBlockC", "outputs": [{ "name": "", "type": "uint256" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [], "name": "endBlockV", "outputs": [{ "name": "", "type": "uint256" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [], "name": "feeAmount", "outputs": [{ "name": "", "type": "uint256" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [{ "name": "index", "type": "uint256" }], "name": "getArtist", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "bool" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [], "name": "getArtistCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [{ "name": "email", "type": "string" }], "name": "getArtistVoteCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [{ "name": "addr", "type": "address" }], "name": "getPeopleVoteCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": !1, "stateMutability": "view", "type": "function" }, { "constant": !0, "inputs": [], "name": "winner", "outputs": [{ "name": "", "type": "address" }], "payable": !1, "stateMutability": "view", "type": "function" }]
var contractAddress = "0x1332213979286792b7023ef347308768904c7ef1";

// Artist entry method
function sendTx() {
    var contractObj = web3.eth.contract(contractAbi).at(contractAddress);
    console.log(contractObj);
    contractObj.artistEntry($('#name').val(), $('#email').val(), $('#url').val(), $('#address').val(), { from: web3.eth.accounts[0], value: web3.toWei(0.1, "ether"), gas: 600073 }, function (error, result) {
        if (!error) {
            alert('check status of transaction from result below:');
            $('.datacat').append(`<a href='https://kovan.etherscan.io/tx/${result}'> Etherscan </a>`);
        }
        else
            $('.datacat').append(error)
    });
}

//Send vote by artist
function sendTxVote() {
    var contractObj = web3.eth.contract(contractAbi).at(contractAddress);
    console.log(contractObj);
    contractObj.voteArtist($('#email').val(), { from: web3.eth.accounts[0] }, function (error, result) {
        console.log(result);
        if (!error) {
            $('.datacat').append(`<a href='https://kovan.etherscan.io/tx/${result}'> Etherscan </a>`);
            alert('check status of transaction from result below:');
        }
        else
            $('.datacat').append(error)
    });
}

// get Artist details
function getListData() {
    $('#myModal').modal('show');
    console.log('in');
    var request = $.ajax({
        url: 'http://localhost:3001/api/v1/admin/getArtist',
        type: 'GET',
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
    });

    request.done(function (data) {
        $('#myModal').modal('hide');
        console.log(data.artList);
        for (let i = 0; i < data.artList.length; i++) {
            console.log(data[i]);
            let html = `<div class='main line${i}'>
        <input type="radio" name="data" value="${i}" checked> Select :  ${i}
                     <div>name:  ${data.artList[i].name}</div>
                     <div>email:  ${data.artList[i].email}</div>
                     <div><img src='${data.artList[i].url}' /></div>
                     <div>Is Certified:  ${data.artList[i].isValid}</div>
        </div>`;
            $('.containernew').append(html);
        }

    });

    request.fail(function (jqXHR, textStatus) {
        $('#myModal').modal('hide');
        console.log(textStatus)
        console.log(jqXHR);
        alert('Failed');
    });
}


//Verify Artist
function sendDataTx() {

    $('#myModal').modal('show');
    console.log('in');
    var requests = $.ajax({
        url: 'http://localhost:3001/api/v1/admin/setCertify',
        type: 'POST',
        crossDomain: true,
        data: JSON.stringify({ "id": $("input[name=data]:checked").val(), "password": $('#password').val() }),
        contentType: 'application/json',
        dataType: 'json',
    });

    requests.done(function (data) {
        console.log(data)
        if (data.status != 0)
            $('.modal-body ').append(`<a href='https://kovan.etherscan.io/tx/${data.status}'> Etherscan </a>`);
        else
            $('.modal-body ').text(`please wait`);

    });

    requests.fail(function (jqXHR, textStatus) {
        console.log(textStatus)
        console.log(jqXHR);
        $('#myModal').modal('hide');
        alert('Failed');
    });

}