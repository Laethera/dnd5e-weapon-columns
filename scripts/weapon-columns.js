Hooks.on("renderActorSheet5eCharacter", (app, html, data) => {
  addWeaponColumns(app, html, data);
});

function addWeaponColumns(app, html, data) {
  const weaponsHeader = html.find('.inventory-list .item-list .item-header');
  if (weaponsHeader.length === 0) return;

  // Add new columns to the header
  weaponsHeader.append('<label class="range">Range</label>');
  weaponsHeader.append('<label class="to-hit">To Hit</label>');
  weaponsHeader.append('<label class="damage">Damage</label>');

  // Add new columns to each weapon item
  const weapons = html.find('.inventory-list .item-list .item.weapon');
  for (let weapon of weapons) {
    const range = getWeaponRange(weapon);
    const toHit = getWeaponToHit(weapon);
    const damage = getWeaponDamage(weapon);

    $(weapon).append(`<span class="range">${range}</span>`);
    $(weapon).append(`<span class="to-hit">${toHit}</span>`);
    $(weapon).append(`<span class="damage">${damage}</span>`);
  }
}

function getWeaponRange(weapon) {
  // Implement logic to get weapon range
  return "N/A";
}

function getWeaponToHit(weapon) {
  // Implement logic to get weapon to hit modifier
  return "+0";
}

function getWeaponDamage(weapon) {
  // Implement logic to get weapon damage
  return "N/A";
}
