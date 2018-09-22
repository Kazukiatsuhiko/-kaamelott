const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "!";
const CLEAR_MESSAGES = '!clear';
const YTDL = require("ytdl-core");
const { get } = require("snekfetch");
const got = require('got');
const api = 'dc6zaTOxFJmzC';

bot.on('ready', function () {
console.log("Bot en ligne")
bot.user.setGame('!help')
})
///////////////////////////////////AIDE DU BOT///////////////////////////////////
bot.on('message', function (message) {
  if (message.content === prefix + "help") {
   var help_embed = new Discord.RichEmbed()
     .setColor('#00F6EE')
     .addField("!bugteso", "teso ne se lance pas")
     .addField("!PURGE", "!PURGE + nombre exemple !PURGE 3 supprime les trois derniers messages")
     .addField("!play", "!play plus lien video youtube")
     .addField("!stop", "Stop la musique")
     .addField("!skip", "Passer a la video suivante")
     .addField("!volume", "Augmenter ou diminuer le volume Entre 0 - 200 ")
     .addField("!replique", "replique kaamelott aléatoire")
     .addField("!chat", "image de chat aléatoire")
     message.channel.sendEmbed(help_embed);
  }
 })
///////////////////////////////////REJOINDRE | QUITTE///////////////////////////////////
bot.on('guildMemberAdd', member => {
  console.log('User ' + member.user.username + ' has joined the server!')
  console.log(member)

  member.guild.channels.get('354913667659333632').send('Bienvenue sur le discord,' + '**' + member.user.username + '**' + '. ' + 'Je vous ai vue vous ai vu une fois dans une carriole, tirée par un cheval. Enfin, la carriole tirée par un cheval.');
})

bot.on('guildMemberRemove', member => {
  member.guild.channels.get('354913667659333632').send('**' + member.user.username + '**' + '. ' + 'Cassez-vous ! Cassez-vous ! Décarrez d’chez moi, bande de clampins ! Taillez-vous vite fait ! Et j’vous conseille de vous mettre au turbin, vous m’entendez ? Et le prochain qui se pointe avec un prototype, un vase à fleurs ou le pot de chambre de sa mamie, j’l’envoie garder les moutons dans les Highlands, pigé ?! Et tenez ! Reprenez vos merdes! Jsuis pas vide-grenier !');

});

///////////////////////////////////MUSIQUE BOT///////////////////////////////////
function play(connection, message) {
var server = servers[message.guild.id];

server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

server.queue.shift();

server.dispatcher.on("end", function() {
if (server.queue[0]) play(connection, message);
  else connection.disconnect();
  })
}

var servers = {};

bot.on("message", function(message) {
if (message.author.equals(bot.user)) return;


if (!message.content.startsWith(prefix)) return;
          var args = message.content.substring(prefix.length).split(" ");

          switch (args[0].toLowerCase()){
          case "play":
            if (!args[1]) {
             message.channel.sendMessage("Veuillez entrer un lien");
               return;
            }

            if (!message.member.voiceChannel) {
               message.channel.sendMessage("Vous devez être dans un chanel vocal");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
             queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
             break;
           case "skip":
             var server = servers[message.guild.id];

             if (server.dispatcher) server.dispatcher.end();
            break;
           case "stop":
              var server = servers[message.guild.id];

              if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
          }

    })







///////////////////////////////////MESSAGE PERSONALISER///////////////////////////////////
bot.on('message', function (message) {
  if (message.content === prefix + 'bugteso') {
    message.reply('Lance teso en admin.. ou alors quitte youporn.. -ELIAS: Y a toujours au moins deux solutions à un problème')
  }
})

bot.on('message', function (message) {
  if (message.content === 'ca va?') {
    message.reply('Aaah mais c est de là que ça vient ! Quand on dit ça va comme sur des roulettes. En fait ça veut dire qu le mec il peut balancer un morceau de rocher comme une catapulte, il continue quand même d avancer dfaçon mobile')
  }
})



///////////////////////////////////IMAGE ALEATOIRE///////////////////////////////////
                                   ////CHAT/////
bot.on('message', msg => {

  if(msg.content.startsWith(prefix + 'chat')){
    try {
      get('https://aws.random.cat/meow').then(res => {
        const embed = new Discord.RichEmbed()
  				.setImage(res.body.file)
  				return msg.channel.send({embed});
  			});
  		} catch(err) {
        return msg.channel.send(error.stack);
		}
	}
    })

///////////////////////////////////REPLIQUE///////////////////////////////////
bot.on('message', function (message) {
  if (message.content === prefix + "replique") {
    random();
    if (randnum == 0) {
      message.reply("Putain, en plein dans sa mouille !")
    }
    if (randnum == 1) {
      message.reply("Donc, pour résumer, je suis souvent victime des colibris, sous-entendu des types qu’oublient toujours tout. Euh, non… Bref, tout ça pour dire, que je voudrais bien qu’on me considère en tant que tel.")
    }
    if (randnum == 2){
      message.reply("Une fois, à une exécution, je m'approche d'une fille. Pour rigoler, je lui fais : Vous êtes de la famille du pendu ? ... C était sa soeur. Bonjour l approche !")
    }
    if (randnum == 3){
      message.reply("Moi, j'serais vous, je vous écouterais... Non, moi, j'serais nous, je vous... Si moi, j'étiez vous, je vous écouterais ! Non, elle me fait chier, cette phrase !")
    }
    if (randnum == 4){
      message.reply("J'voudrais pas faire ma raclette, mais la soirée s'annonce pas super.")
    }
    if (randnum == 5){
      message.reply("Et toc ! Remonte ton slibard, Lothard !")
    }
    if (randnum == 6){
      message.reply("Mais y a rien à développer ! C'est de la merde, c'est de la merde ! Moi, on me sert ça dans une auberge, le tavernier, il s'prend une quiche dans sa tête !")
    }
    if (randnum == 7){
      message.reply("Moi, je m'en fous, si on me force à y retourner, je retiens ma respiration jusqu'à ce qu'on arrête de me forcer à y retourner.")
    }
  }
})

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(7);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}




///////////////////////////////////CLEAR MESSAGE///////////////////////////////////


bot.on('message', message => {


    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);








    if (msg.startsWith(prefix + 'PURGE')) {

        async function purge() {
            message.delete();


            if (!message.member.roles.find("name", "Arthur_Pendragon")) {
                message.channel.send('commande refusée');
                return;
            }


            if (isNaN(args[0])) {

                message.channel.send('Veuillez entrer un nombre comme argument. \n Usage: ' + prefix + 'purge <nombre>');

                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages trouvés, suppression...');


            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

        }


        purge();

    }
});


bot.on('ready', () => {


    console.log('Bot started.');

});

bot.login("NDkwNTY5ODIyMTQ1NDc4NjU3.Dn7RXQ.DxQXOzCGC3pOrOqmXbNqZsac9ls");
