'use strict';

// Issue and Pull Request Page
togglbutton.render('#partial-discussion-sidebar', { observe: true }, function (
  elem
) {
  const numElem = $('.gh-header-number');
  const titleElem = $('.js-issue-title');
  const projectElem = $('h1.public strong a, h1.private strong a');
  const projectBetaElem = $("#partial-discussion-sidebar > div:nth-child(3) > form > span > collapsible-sidebar-widget > div > div.d-flex.width-full.flex-justify-between.flex-items-center > a > span")
  const existingTag = $('.discussion-sidebar-item.toggl');
  
  const tags = [...$(".js-issue-labels").children].map(child => [...child.children].map(child => child.textContent)[0])

  // Check for existing tag, create a new one if one doesn't exist or is not the first one
  // We want button to be the first one because it looks different from the other sidebar items
  // and looks very weird between them.

  if (existingTag) {
    if (existingTag.parentNode.firstChild.classList.contains('toggl')) {
      return;
    }
    existingTag.parentNode.removeChild(existingTag);
  }

  const org = $("#repository-container-header > div.d-flex.mb-3.px-3.px-md-4.px-lg-5 > div > h2 > span.author.flex-self-stretch > a").textContent
  const rep = $("#repository-container-header > div.d-flex.mb-3.px-3.px-md-4.px-lg-5 > div > h2 > strong > a").textContent

  let description = titleElem.textContent;
  if (numElem !== null) {
    description = 'https://github.com/' + org + '/' + rep + '/issues/' + numElem.textContent.slice(1);
  }

  const div = document.createElement('div');
  div.classList.add('discussion-sidebar-item', 'toggl');
  
  const link = togglbutton.createTimerLink({
    className: 'github',
    description,
    projectName: projectElem?.textContent || projectBetaElem?.textContent,
    tags
  });

  div.appendChild(link);
  elem.prepend(div);
});

// Project Page
togglbutton.render('.js-project-card-details .js-comment:not(.toggl)', { observe: true }, function (
  elem
) {
  const titleElem = $('.js-issue-title');
  const numElem = $('.js-project-card-details .project-comment-title-hover span.color-text-tertiary');
  const projectElem = $('h1.public strong a, h1.private strong a');

  let description = titleElem.textContent;
  if (numElem !== null) {
    description = numElem.textContent + ' ' + description.trim();
  }

  const link = togglbutton.createTimerLink({
    className: 'github',
    description: description,
    projectName: projectElem && projectElem.textContent
  });

  const wrapper = createTag('div', 'discussion-sidebar-item js-discussion-sidebar-item');
  wrapper.appendChild(link);

  const target = $('.discussion-sidebar-item');
  target.parentNode.insertBefore(wrapper, target);
});
