import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import brain from 'brain';

Meteor.methods({
  train(samples) {
    // check(net, Object);
    check(samples, [Object]);

    const net = new brain.NeuralNetwork();

    const train = net.train(samples);
    console.log(`Net trained:`, train);

    const netJSON = net.toJSON();
    return { netJSON, train };
  },

});
