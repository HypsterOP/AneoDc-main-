/* eslint-disable no-unused-vars */
const { Message, Permissions } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: "removerole",
  run: async (client, message, args) => {
    //lets use parameters (optional)
    /**
     * @param {Message} message
     */
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return;
    const target = message.mentions.members.first();
    if (!target)
      return message.channel.send({content:
        `I couldn't find that member, or there was no member`
      }
      );
    const role = message.mentions.roles.first();
    if (!role)
      return message.channel.send({content:
        `There was no role like that or not found!`
      }
      ); //when no role is specified or pinged
    //now the code!
    await target.roles.remove(role); // adding the role to the user
    message.channel
      .send({content:
        `${target.user.username}'s role has been removed`
      }
      )

      .catch((error) => {
        message.channel.send({content:
          `An Error Occured Make sure my role is above the role which you want to remove!`
        }
        );
      });
  },
};
