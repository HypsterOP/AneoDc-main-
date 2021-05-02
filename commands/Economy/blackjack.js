const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const cooldown = new Set()
module.exports = {
    name: 'blackjack',
    alaises: ["bj"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(cooldown.has(message.author.id)) {
            message.reply(`You are on a 10 seconds cooldown!`)
          } else {


            const money = parseInt(args[0])
            const userId = message.author
        
              if (100 >= money || isNaN(money) || !money) {
                  message.channel.send("Please provide a valid number of coins.")
                  return;
              }
        
              if (await client.bal(userId.id) < bet) {
                  message.channel.send("You dont have enough money")
                  return
              }
        
        
              var numCardsPulled = 0;
              var gameOver = false;
        
              var player = {
                  cards: [],
                  score: 0
              };
              var dealer = {
                  cards: [],
                  score: 0
              };
        
              function getCardsValue(a) {
                  var cardArray = [],
                      sum = 0,
                      i = 0,
                      dk = 10.5,
                      doubleking = "QQ",
                      aceCount = 0;
                  cardArray = a;
                  for (i; i < cardArray.length; i += 1) {
                      if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
                          sum += 10;
                      } else if (cardArray[i].rank === "A") {
                          sum += 11;
                          aceCount += 1;
                      } else if (cardArray[i].rank === doubleking) {
                          sum += dk
                      } else {
                          sum += cardArray[i].rank;
                      }
                  }
                  while (aceCount > 0 && sum > 21) {
                      sum -= 10;
                      aceCount -= 1;
                  }
                  return sum;
              }
        
              var deck = {
                  deckArray: [],
                  initialize: function() {
                      var suitArray, rankArray, s, r, n;
                      suitArray = ["b", "d", "g", "s"];
                      rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
                      n = 13;
        
                      for (s = 0; s < suitArray.length; s += 1) {
                          for (r = 0; r < rankArray.length; r += 1) {
                              this.deckArray[s * n + r] = {
                                  rank: rankArray[r],
                                  suit: suitArray[s]
                              };
                          }
                      }
                  },
                  shuffle: function() {
                      var temp, i, rnd;
                      for (i = 0; i < this.deckArray.length; i += 1) {
                          rnd = Math.floor(Math.random() * this.deckArray.length);
                          temp = this.deckArray[i];
                          this.deckArray[i] = this.deckArray[rnd];
                          this.deckArray[rnd] = temp;
                      }
                  }
              };
        
              deck.initialize();
              deck.shuffle();
        
              async function bet(outcome) {
                if (outcome === "win") {
                client.add(userId.id, money)
                }
                if (outcome === "lose") {
                client.rmv(userId.id, money)
                }
            }
        
              function endMsg(f, msg, cl, dealerC) {
                  let cardsMsg = "";
                  player.cards.forEach(function(card) {
                    var emAR = ["♥","♦","♠","♣"]
                    var t = emAR[Math.floor(Math.random() * emAR.length)];
                      cardsMsg += "[`" +t+ card.rank.toString();
                      if (card.suit == "d1") cardsMsg += "♥"
                      if (card.suit == "d2") cardsMsg += "♦"
                      if (card.suit == "d3") cardsMsg += "♠"
                      if (card.suit == "d4") cardsMsg += "♣"
                      cardsMsg += "`](https://www.youtube.com/watch?v=msSc7Mv0QHY) "
                  });
                  cardsMsg += " > " + player.score.toString()
        
                  var dealerMsg = "";
                  if (!dealerC) {
                    var emAR = ["♥","♦","♠","♣"]
                    var t = emAR[Math.floor(Math.random() * emAR.length)];
                      dealerMsg = "[`" +t+ dealer.cards[0].rank.toString();
                      if (dealer.cards[0].suit == "d1") dealerMsg += "♥"
                      if (dealer.cards[0].suit == "d2") dealerMsg += "♦"
                      if (dealer.cards[0].suit == "d3") dealerMsg += "♠"
                      if (dealer.cards[0].suit == "d4") dealerMsg += "♣"
                      dealerMsg += " ? ?`](https://www.youtube.com/watch?v=YhqQaxlPjUw)"
                  } else {
                      dealerMsg = "";
                      dealer.cards.forEach(function(card) {
                        var emAR = ["♥","♦","♠","♣"]
                        var t = emAR[Math.floor(Math.random() * emAR.length)];
                          dealerMsg += "[`" +t+ card.rank.toString();
                          if (card.suit == "d1") dealerMsg += "♥"
                          if (card.suit == "d2") dealerMsg += "♦"
                          if (card.suit == "d3") dealerMsg += "♠"
                          if (card.suit == "d4") dealerMsg += "♣"
                          dealerMsg += "`](https://www.youtube.com/watch?v=YhqQaxlPjUw) "
                      });
                      dealerMsg += " > " + dealer.score.toString()
                  }
        
                  const gambleEmbed = new Discord.MessageEmbed()
                      .setColor(cl)
                      .setTitle(message.author.username + `'s table`)
                      .addField('You', cardsMsg, true)
                      .addField('Dealer', dealerMsg, true)
                      .addField(f, msg)
        
                  message.channel.send(gambleEmbed);
              }
        
              async function endGame() {
                  if (player.score === 21) {
                      bet('win');
                      gameOver = true;
                      await endMsg(`Win. You are 21!`,`Dealer had ${dealer.score.toString()}`, `GREEN`)
                  }
                  if (player.score > 21) {
                      bet('lose');
                      gameOver = true;
                      await endMsg(`Lost. You reached 21!`,`Dealer had ${dealer.score.toString()}`, `RED`)
                  }
                  if (dealer.score === 21) {
                      bet('lose');
                      gameOver = true;
                      await endMsg(`Lost. The dealer got 21!`,`Dealer had ${dealer.score.toString()}`, `RED`)
                  }
                  if (dealer.score > 21) {
                      bet('win');
                      gameOver = true;
                      await endMsg(`Win. Dealer reached 21!`,`Dealer had ${dealer.score.toString()}`, `GREEN`)
                  }
                  if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
                      bet('win');
                      gameOver = true;
                      await endMsg(`Win. You defeated dealer!`,`Dealer had ${dealer.score.toString()}`, `GREEN`)
                  }
                  if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
                      bet('lose');
                      gameOver = true;
                      await endMsg(`Lost. Dealer won!`,`Dealer had ${dealer.score.toString()}`, `RED`)
                  }
                  if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
                      gameOver = true;
                      await endMsg(`Tie. Sadly minus reputation`,`Dealer had ${dealer.score.toString()}`, `RED`)
                  }
              }
        
              function dealerDraw() {
        
                  dealer.cards.push(deck.deckArray[numCardsPulled]);
                  dealer.score = getCardsValue(dealer.cards);
                  numCardsPulled += 1;
              }
        
              function newGame() {
                  hit();
                  hit();
                  dealerDraw();
                  endGame();
              }
        
              function hit() {
                  player.cards.push(deck.deckArray[numCardsPulled]);
                  player.score = getCardsValue(player.cards);
        
                  numCardsPulled += 1;
                  if (numCardsPulled > 2) {
                      endGame();
                  }
              }
        
              function stand() {
                  while (dealer.score < 17) {
                      dealerDraw();
                  }
                  endGame();
              }
              // END Javascript blackjack game from echohatch1. Modified for Grape. **
        
              newGame();
              async function loop() {
                  if (gameOver) return;
        
                  endMsg('To hit type `h`, for stand type `s`',`GoodLuck ;)`, `GRAY`)
        
                  let filter = m => m.author.id === message.author.id;
                  message.channel.awaitMessages(filter, {
                      max: 1,
                      time: 1200000,
                      errors: ['time']
                  }).then(message => {
                      message = message.first()
                      if (message.content === "h" || message.content === "hit") {
                          hit();
                          loop();
                          return
                      } else if (message.content === "s" || message.content === "stand") {
                          stand();
                          loop();
                          return
                      } else {
                          bet("lose");
                          return
                      }
                  }).catch(_ => {
                      message.channel.send("Lost all nub xdxdxd");
                      bet("lose");
                      return
                  })
              }
        
              await loop()

              cooldown.add(message.author.id)
              setTimeout(() => {
                  cooldown.delete(message.author.id)
              }, 10000);
          }
    }
}