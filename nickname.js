export const NICKNAME_LIMIT=12;

export function normalizeNickname(value){
 if(typeof value!=='string'||value.length>128)return '';
 const name=value.normalize('NFC').replace(/^ +| +$/g,'').replace(/ +/g,' ');
 if([...name].length>NICKNAME_LIMIT||!/^[\p{L}\p{N}][\p{L}\p{N}\p{M} _-]*$/u.test(name))return '';
 // Invisible variation selectors and formatting marks can make names hard to identify.
 return /\p{Default_Ignorable_Code_Point}/u.test(name)?'':name;
}

export const escapeRankingName=name=>String(name).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
