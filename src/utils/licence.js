export default function licence(caption_in) {
  
    var caption = caption_in
    
    var licence1 = "CC BY-SA 3.0 IGO";
    var licence2 = "Gatsby";
    var licence3 = "Bootstrap";
    var licence4 = "Unsplash"
    var licence5 = "Disney"
      
    if (caption.includes(licence1)) {
        var licence = licence1;
        var licenceLink = "https://creativecommons.org/licenses/by-sa/3.0/igo/";
        var newCaption = caption.replace('CC BY-SA 3.0 IGO', '');
    } else if (caption.includes(licence2)) {
        var licence =  licence2;
        var licenceLink = "https://www.gatsbyjs.org/";
        var newCaption = caption.replace('Gatsby', '');
    } else if (caption.includes(licence3)) {
        var licence =  licence3;
        var licenceLink = "https://getbootstrap.com/";
        var newCaption = caption.replace('Bootstrap', '');
    } else if (caption.includes(licence4)) {
        var licence =  caption;
    } else if (caption.includes(licence5)) {
        var licence =  caption;
    } else {
      var licence = caption;
    }

    return [licence, licenceLink, newCaption]
};