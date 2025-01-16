(() => {
    const geq = (self.geq = self.geq || []);
  
    if (geq.initialize) return;
  
    if (geq.invoked) {
      console.error("GE snippet included twice.");
      return;
    }
  
    geq.invoked = true;
    geq.methods = [
      "page",
      "suppress",
      "track",
      "doNotTrack",
      "trackOrder",
      "identify",
      "addToCart",
      "callBack",
      "event",
    ];
  
    geq.factory = (method) => {
      return function () {
        const args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        geq.push(args);
        return geq;
      };
    };
  
    for (let i = 0; i < geq.methods.length; i++) {
      const key = geq.methods[i];
      geq[key] = geq.factory(key);
    }
  
    geq.SNIPPET_VERSION = "1.6.1";
  
    // Trigger the `page` method
    geq.page();
  })();
  