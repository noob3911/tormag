const search = document.querySelector('#form');
const inputVal = document.querySelector('input');
const titleinp =document.querySelector('.title');
const magnetlnk =document.querySelector('.magnet');
const reSearch =document.querySelector('.errorSearch');
var meggi=document.querySelector('#mglink');
var meglinkLoad=document.querySelector('#mgloading');

search.addEventListener('submit',(e) => {
	e.preventDefault();
	const searchTerm = inputVal.value;
	titleinp.textContent='Loading...';
	reSearch.textContent='';
	const url = `/tors?address=${searchTerm}`;
	fetch(url).then((res)=>{
		res.json().then((dat)=>{
			titleinp.textContent='';
			if(dat.length===undefined){
				return reSearch.textContent+="Enter Search Term... ";
			}
			else{
				for(var i=0;i<dat.length; i++){
					const list = document.createElement('li');
					const magnet = document.createElement('ul');
					const size = document.createElement('ul');
					const seeds = document.createElement('ul');
					size.style.color = "#e6e600";
					seeds.style.color = "#00E800";
					list.innerHTML =`# ${i+1} : ${dat[i].title}`;
					size.innerHTML="Size: " + dat[i].size; 
					seeds.innerHTML="Seeds: " + dat[i].seeds;

					magnet.innerHTML=`<a href="${dat[i].link}">Copy Magnet</a>`;

					titleinp.appendChild(list);
					titleinp.appendChild(size);
					titleinp.appendChild(seeds);
					list.appendChild(magnet);

					magnet.addEventListener('click',getMegLink);

				}
			}
		}).catch((error)=>{
			titleinp.textContent='';
			return reSearch.textContent=" Not Found Refine Your Search... ";
		})

	})
});

function getMegLink(e){
	e.preventDefault();
	var megUrl = e.target.href;

	(function()
		{M.toast({html: 'Copying...!',
			classes:'red rounded'});
	})();

	const copyToClipboard = str => {
		const el = document.createElement('textarea');
		el.value = str;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
	};
	const link=`http://samcloud.tplinkdns.com:50000/getTorrentData?link=${megUrl}`;
	fetch(link)
	.then((res)=>res.json())
	.then((data)=>{
		copyToClipboard(data.magnet);

		(function()
			{M.toast({html: 'Copied!', displayLength: 2400, classes:'green rounded'});
			copyToClipboard(data.magnet);
		})();

	})
}



