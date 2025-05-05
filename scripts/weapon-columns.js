Hooks.on("renderActorSheet5eCharacter2", (app, html, data) => {
  addWeaponColumns(app, html, data);
  console.log("Weapon columns added to the character sheet.");
  console.log(app, html, data);
});

Hooks.on("renderActorSheet", (app, html, data) => {
  console.log(`Sheet class: ${app.constructor.name}`);
});

Hooks.on("ready", function () {
  console.log("Weapon columns script is ready.");
});


function addWeaponColumns(app, html, data) {
  const weaponsSection = html.find('.items-section.card[data-type="weapon"]');
  if (weaponsSection.length === 0) return;

  const weaponsList = weaponsSection.find('.item-list');
  const weaponsHeader = weaponsSection.find('.items-header.header');
  const weaponRows = weaponsList.find('.item');

  
  // Add new header columns
  weaponsHeader.append('<div class="item-header item-range">Range</div>');
  weaponsHeader.append('<div class="item-header item-to-hit">To Hit</div>');
  weaponsHeader.append('<div class="item-header item-damage">Damage</div>');

  // Add new detail columns to each weapon row
  weaponRows.each((_, rowElem) => {
    const $row = $(rowElem).find('.item-row'); // Target the .item-row div
    const itemId = rowElem.dataset.itemId; // Correct dataset access
    console.log("Found item ID:", itemId, "in row:", $row);
    const item = app.actor.items.get(itemId);
    console.log(item);

    const rangeShort = getWeaponRangeShort(item);
    const rangeLong = getWeaponRangeLong(item);
    const range = rangeLong !== 0 ? rangeShort + " / " + rangeLong : rangeShort;
    const toHit = getWeaponToHit(item);
    const damage = getWeaponDamage(item);

    // Append new columns inside the .item-row div
    $row.append(`<div class="item-detail item-range">${range}</div>`);
    $row.append(`<div class="item-detail item-to-hit">${toHit}</div>`);
    $row.append(`<div class="item-detail item-damage">${damage}</div>`);
  });

  // Add CSS styles for the new columns
  weaponsList.find('.item-weight').css('width', 'auto');
  weaponsList.find('.item-name').css({
    'max-width': '122px',
    'word-wrap': 'normal',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
  });
  weaponsHeader.find('.item-name').css({
    'max-width': '122px',
    'word-wrap': 'normal',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
  });

  weaponsHeader.find('.item-weight').css({
    'position': 'relative',
    'left': '-20px',
  })
  weaponsList.find('.item-weight').css({
    'width': '20px',
  });

  weaponsList.find('.item-quantity').css({
    'width': '40px',
    'position': 'relative',
    'left': '25px',
  });
  weaponsHeader.find('.item-quantity').css({
    'position': 'relative',
    'left': '-30px',
  });

  weaponsHeader.find('.item-uses').css('display', 'none');
  weaponsList.find('.item-uses').css('display', 'none');

  weaponsList.find('.item-controls').css({
    'position': 'relative',
    'left': '260px',
  });

  weaponsList.find('.item-range').css({
    'position': 'relative',
    'left': '-28px',
  });
  weaponsHeader.find('.item-range').css({
    'position': 'relative',
    'left': '-100px',
  });

  weaponsList.find('.item-to-hit').css({
    'position': 'relative',
    'left': '-13px',
  });
  weaponsHeader.find('.item-to-hit').css({
    'position': 'relative',
    'left': '-87px',
  });

  weaponsList.find('.item-damage').css({
    'position': 'relative',
    'left': '30px',
  });
  weaponsHeader.find('.item-damage').css({
    'position': 'relative',
    'left': '-50px',
  });
}

function getWeaponRangeShort(item) {
  if (!item) return "N/A";
  const range = item.system.range;
  if (range && range.value) return `${range.value} ${range.units || ''}`;
  return "—";
}

function getWeaponRangeLong(item) {
  if (!item) return "N/A";
  const range = item.system.range;
  if (range && range.long) return `${range.long} ${range.units || ''}`;
  return "—";
}

function getWeaponToHit(item) {
  if (!item) return "+0";
  return item.labels.toHit || "+0"; // Use the label directly from the item
}

function getWeaponDamage(item) {
  if (!item.labels.derivedDamage || item.labels.derivedDamage.length === 0) return "—"; // No derived damage available
  return item.labels.derivedDamage[0].formula || "—"; // Use the label directly from the item
}

