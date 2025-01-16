(() => {
    const geq = (window.geq = window.geq || []);
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
  
    geq.load = (key) => {
      // Dynamically load external script
      fetch(
        location.href.includes("vge=true")
          ? `https://s3-us-west-2.amazonaws.com/jsstore/a/${key}/ge.js?v=${Math.random()}`
          : `https://s3-us-west-2.amazonaws.com/jsstore/a/${key}/ge.js`
      )
        .then((response) => response.text())
        .then((scriptText) => {
          eval(scriptText);
          console.log("Script loaded successfully.");
        })
        .catch((err) => console.error("Error loading script:", err));
    };
  
    geq.SNIPPET_VERSION = "1.6.1";
    geq.load("X2JH31E");
  
    // Trigger the page method
    geq.page = () => console.log("geq.page() called");
    geq.page();
  })();
  