var get_header_num = (header) => header.querySelector("span").textContent
var get_header_text = (header) =>
    Array.prototype.filter.call(
        header.childNodes,
        n => n.nodeType == Node.TEXT_NODE
    )[0].textContent
var format_header = (header) => get_header_num(header) + ". " + get_header_text(header)

var build_toc = () => {
    var toc = document.createElement("ul");
    document.querySelectorAll(".outline-2").forEach((l2) => {
        var l2_elem = document.createElement("li")
        var l2_hdr = l2.querySelector("h2")
        var l2_link = document.createElement("a")
        l2_link.href = "#" + l2_hdr.id
        l2_link.appendChild(document.createTextNode(format_header(l2_hdr)))
        l2_elem.appendChild(l2_link);

        var l3_container = document.createElement("ul")
        l2.querySelectorAll(".outline-3").forEach((l3) => {
            var l3_elem = document.createElement("li")
            var l3_hdr = l3.querySelector("h3")
            var l3_link = document.createElement("a")
            l3_link.href = "#" + l3_hdr.id
            l3_link.appendChild(document.createTextNode(format_header(l3_hdr)))
            l3_elem.appendChild(l3_link)
            l3_container.appendChild(l3_elem)
        });
        l2_elem.appendChild(l3_container)
        toc.appendChild(l2_elem);
    });
    var toc_container = document.querySelector("#toc");
    toc_container.innerHTML = "";
    toc_container.appendChild(toc);
    toc_container.style.visibility = "visible";
}

var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 

    document.querySelectorAll("a").forEach(
        (link) => {
            if (link.hash.startsWith("#org")) {
                var hdr  = document.querySelector(link.hash)
                link.textContent = format_header(hdr)
            }
        }
    )

    build_toc()
    
})
