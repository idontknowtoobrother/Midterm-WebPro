const express = require('express');
const fs = require("fs");
const path = require('path');
const host = express()
const userData = require('./person.json')

// Member Page
let memberPage = fs.readFileSync(path.join(__dirname, '/public/html/member.html')).toString()


requireUserData = (email, password) => {
    let userRequest = false
    userData.forEach((user, index) => {
        if (user.email == email && user.password == password) {
            userRequest = user
        }
    })
    return userRequest
}

host.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/login.html'))
})


host.get('/login', (req, res) => {
    let reqData = req.query
    let user = requireUserData(reqData.email, reqData.password)
    if (!user || (user && user.member == 'No')) {
        // Member 'Not Found' || 'No'
        res.sendFile(path.join(__dirname, '/public/html/nonmember.html'))
        return
    }

    // Member 'Yes'
    for (let key in user) {
        memberPage = memberPage.replace(`{${key}}`, `${key}:${user[key]}`)
    }
    res.send(memberPage)
})



host.listen(8081, () => {
    console.log('Host on routine ...');
})