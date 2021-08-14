const { json } = require('express')
const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

const path = require('path')

const ytch = require('yt-channel-info')


// parse application/x-www-form-urlencoded


// parse application/json

app.use(express.urlencoded({ extended:true }))

app.use(express.json())

app.set('views', path.join(__dirname, 'views')); 

app.set('view engine', 'ejs')



app.get('/', (req, res) => {

   res.render('index')

     

});


app.post('/getchannelinfo', (req, res) => {

   console.log(req.body.channelname);

   const channelId = req.body.channelname;

ytch.getChannelInfo(channelId, 0).then((response) => {
   console.log(response)
   res.json({
      stats:response
   })
}).catch((err) => {
   console.log(err)
})



});



app.post('/getvideo', (req, res) => {

   console.log(req.body.channelname);

   const channelId = req.body.channelname;

const sortBy = 'newest'

ytch.getChannelVideos(channelId, sortBy, 0).then((response) => {
   
   res.json({
      stats:response,
   })
}).catch((err) => {
  console.log(err)
})

    

});


app.listen(PORT, () => console.log(`listening to port ${PORT}`))