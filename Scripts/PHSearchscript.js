// ==UserScript==
// @name         PH - Search & UI Tweaks
// @namespace    brazenvoid
// @version      3.1.3
// @author       brazenvoid
// @license      GPL-3.0-only
// @description  Various search filters and user experience enhancers
// @match        https://*.pornhub.com/*
// @match        https://*.pornhubpremium.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require      https://greasyfork.org/scripts/375557-base-resource/code/Base%20Resource.js?version=899286
// @require       file:\\C:/cfg/oknew.js
// @require      https://greasyfork.org/scripts/418665-brazen-configuration-manager/code/Brazen%20Configuration%20Manager.js?version=892799
// @require      https://greasyfork.org/scripts/416105-brazen-base-search-enhancer/code/Brazen%20Base%20Search%20Enhancer.js?version=918349
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

GM_addStyle(`#settings-wrapper{top:5vh;width:180px}.bg-brand{background-color:#0b0b0b}.font-primary{color:#ffa31a}.font-secondary{color:#ffa31a}`)

// Environment

const PAGE_PATH_NAME = window.location.pathname

const IS_FEED_PAGE = PAGE_PATH_NAME.startsWith('/feeds')
const IS_PLAYLIST_PAGE = PAGE_PATH_NAME.startsWith('/playlist')
const IS_PROFILE_PAGE = PAGE_PATH_NAME.startsWith('/model') || PAGE_PATH_NAME.startsWith('/channels') || PAGE_PATH_NAME.startsWith('/user') ||
    PAGE_PATH_NAME.startsWith('/pornstar')
const IS_VIDEO_PAGE = PAGE_PATH_NAME.startsWith('/view_video')
const IS_VIDEO_SEARCH_PAGE = PAGE_PATH_NAME.startsWith('/video') || PAGE_PATH_NAME.startsWith('/categories')

const SCRIPT_PREFIX = 'ph-sui-'

const SELECTOR_ITEM = '.videoblock'
const SELECTOR_ITEM_LIST = 'ul.videos'
const SELECTOR_ITEM_NAME = '.title > a'

// Filters and configuration

const FILTER_HD_VIDEOS = 'Only HD'
const FILTER_PAID_VIDEOS = 'H Paid'
const FILTER_PREMIUM_VIDEOS = 'H Prem'
const FILTER_PRO_CHANNEL_VIDEOS = 'H Pro Cha'
const FILTER_PRIVATE_VIDEOS = 'H Private'
const FILTER_RECOMMENDED_VIDEOS = 'H Recom'
const FILTER_VIDEOS_VIEWS = 'View'
const FILTER_WATCHED_VIDEOS = 'H Watch'

const LINK_DISABLE_PLAYLIST_CONTROLS = 'Disable Play Contr'
const LINK_USER_PUBLIC_VIDEOS = 'User Public Videos'

const UI_REMOVE_IFRAMES = 'Remove Ad IFrames'
const UI_REMOVE_LIVE_MODELS_SECTIONS = 'Remove Live Models Sections'
const UI_REMOVE_PORN_STAR_SECTIONS = 'Remove Porn Star Sections'

class PHSearchAndUITweaks extends BrazenBaseSearchEnhancer
{
    constructor ()
    {
        super(SCRIPT_PREFIX, SELECTOR_ITEM, $('#topRightProfileMenu').length > 0)

        this._configurationManager.
            addFlagField(FILTER_HD_VIDEOS, 'Hides videos of less than 720p resolution.').
            addFlagField(FILTER_PAID_VIDEOS, 'H paid videos.').
            addFlagField(FILTER_PREMIUM_VIDEOS, 'H premium videos.').
            addFlagField(FILTER_PRIVATE_VIDEOS, 'H private Videos.').
            addFlagField(FILTER_PRO_CHANNEL_VIDEOS, 'H videos from professional channels.').
            addFlagField(FILTER_RECOMMENDED_VIDEOS, 'H recommended videos.').
            addFlagField(FILTER_WATCHED_VIDEOS, 'H already watched videos.').
            addFlagField(LINK_DISABLE_PLAYLIST_CONTROLS, 'Disable playlist controls on video pages.').
            addFlagField(LINK_USER_PUBLIC_VIDEOS, 'Jump directly to public videos on any profile link click.').
            addFlagField(UI_REMOVE_IFRAMES, 'Removes all ad iframes.').
            addFlagField(UI_REMOVE_LIVE_MODELS_SECTIONS, 'Remove live model stream sections from search.').
            addFlagField(UI_REMOVE_PORN_STAR_SECTIONS, 'Remove porn star listings from search.').
            addRangeField(FILTER_VIDEOS_VIEWS, 0, 10000000, 'Filter videos by view count.')

        this._setupUI()
        this._setupCompliance()
        this._setupComplianceFilters()
    }

    /**
     * Remove paid videos listing
     * @private
     */
    _complyPaidVideosSectionOnVideoPage ()
    {
        if (this._configurationManager.getValue(FILTER_PAID_VIDEOS)) {
            $('#p2vVideosVPage').remove()
        }
    }

    /**
     * Changes profile links to directly point to public video listings
     * @private
     */
    _complyProfileLinks ()
    {
        if (this._configurationManager.getValue(LINK_USER_PUBLIC_VIDEOS)) {
            $('.usernameBadgesWrapper a, a.usernameLink, .usernameWrap a').each((index, profileLink) => {
                profileLink = $(profileLink)
                let href = profileLink.attr('href')
                if (href.startsWith('/channels') || href.startsWith('/model')) {
                    profileLink.attr('href', href + '/videos')
                } else {
                    if (href.startsWith('/user')) {
                        profileLink.attr('href', href + '/videos/public')
                    }
                }
            })
        }
    }

    /**
     * Fixes left over space after ads removal
     * @private
     */
    _fixLeftOverSpaceOnVideoSearchPage ()
    {
        $('.showingCounter, .tagsForWomen').each((index, div) => {
            div.style.height = 'auto'
        })
    }

    /**
     * Fixes pagination nav by moving it under video items list
     * @private
     */
    _fixPaginationNavOnVideoSearchPage ()
    {
        $('.pagination3').insertAfter($('div.nf-videos .search-video-thumbs'))
    }

    /**
     * Removes any IFrames being displayed by going over the page repeatedly till none exist
     * @private
     */
    _removeIframes ()
    {
        let removeMilkTruckIframes = () => {
            let iframes = $('milktruck')
            let count = iframes.length
            iframes.remove()
            return count
        }

        if (this._configurationManager.getValue(UI_REMOVE_IFRAMES)) {
            Validator.iFramesRemover()
            let iframesCount
            do {
                iframesCount = removeMilkTruckIframes()
            } while (iframesCount)
        }
    }

    _removeLoadMoreButtons ()
    {
        $('.more_recommended_btn, #loadMoreRelatedVideosCenter').remove()
    }

    /**
     * @private
     */
    _removeLiveModelsSections ()
    {
        if (this._configurationManager.getValue(UI_REMOVE_LIVE_MODELS_SECTIONS)) {
            $('.streamateContent').each((index, element) => {$(element).parents('.sectionWrapper:first').remove()})
        }
    }

    /**
     * @private
     */
    _removePornStarSectionsFromSearchPage ()
    {
        if (this._configurationManager.getValue(UI_REMOVE_PORN_STAR_SECTIONS)) {
            $('#relatedPornstarSidebar').remove()
        }
    }

    /**
     * @private
     */
    _removePremiumSectionFromSearchPage ()
    {
        if (this._configurationManager.getValue(FILTER_PREMIUM_VIDEOS)) {
            $('.nf-videos .sectionWrapper .sectionTitle h2').each((index, element) => {
                let sectionTitle = $(element)
                if (sectionTitle.text().trim() === 'Premium Videos') {
                    sectionTitle.parents('.sectionWrapper:first').remove()
                    return false
                }
            })
        }
    }

    /**
     * Removes premium video sections from profiles
     * @private
     */
    _removeVideoSectionsOnProfilePage ()
    {
        const videoSections = [
            {setting: this._configurationManager.getValue(FILTER_PAID_VIDEOS), linkSuffix: 'paid'},
            {setting: this._configurationManager.getValue(FILTER_PREMIUM_VIDEOS), linkSuffix: 'fanonly'},
            {setting: this._configurationManager.getValue(FILTER_PRIVATE_VIDEOS), linkSuffix: 'private'},
        ]
        for (let videoSection of videoSections) {
            let videoSectionWrapper = $('.videoSection > div > div > h2 > a[href$="/' + videoSection.linkSuffix + '"]').parents('.videoSection:first')
            videoSection.setting ? videoSectionWrapper.show() : videoSectionWrapper.hide()
        }
    }

    /**
     * @private
     */
    _setupCompliance ()
    {
        this._onGetItemLists = () => $(SELECTOR_ITEM_LIST)

        this._onGetItemName = (videoItem) => videoItem.find(SELECTOR_ITEM_NAME).text()

        this._onFirstHitAfterCompliance = (item) => {
            if (IS_PLAYLIST_PAGE) {
                this._validatePlaylistVideoLink(item)
            }
            Validator.sanitizeTextNode(item.find(SELECTOR_ITEM_NAME), this._configurationManager.getFieldOrFail(FILTER_TEXT_SANITIZATION).optimized)
        }

        this._playlistPageUsername = ''
        this._profilePageUsername = ''

        if (IS_FEED_PAGE) {
            this._onAfterInitialization = () => ChildObserver.create().
                onNodesAdded((itemsAdded) => {
                    let itemsList
                    for (let item of itemsAdded) {
                        if (typeof item.querySelector === 'function') {
                            itemsList = item.querySelector(SELECTOR_ITEM_LIST)
                            if (itemsList) {
                                this._complyItemsList($(itemsList))
                            }
                        }
                    }
                }).
                observe($('#moreData')[0])
        }
    }

    /**
     * @private
     */
    _setupComplianceFilters ()
    {
        this._addItemTextSanitizationFilter(
            'Censor video names by substituting offensive phrases. Each rule in separate line with comma separated target phrases. Requires page reload to apply. Example Rule: boyfriend=stepson,stepdad')
        this._addItemWhitelistFilter('Show videos with specified phrases in their names. Separate the phrases with line breaks.')
        this._addItemTextSearchFilter()
        this._addItemComplianceFilter(FILTER_WATCHED_VIDEOS, (item) => Validator.isChildMissing(item, '.watchedVideoText'))
        this._addItemPercentageRatingRangeFilter('.value')
        this._addItemDurationRangeFilter('.duration')
        this._addItemComplianceFilter(FILTER_VIDEOS_VIEWS, (item, range) => {
            let viewsCountString = item.find('.views').text().replace(' views', '')
            let viewsCountMultiplier = 1
            let viewsCountStringLength = viewsCountString.length

            if (viewsCountString[viewsCountStringLength - 1] === 'K') {
                viewsCountMultiplier = 1000
                viewsCountString = viewsCountString.replace('K', '')
            } else {
                if (viewsCountString[viewsCountStringLength - 1] === 'M') {
                    viewsCountMultiplier = 1000000
                    viewsCountString = viewsCountString.replace('M', '')
                }
            }
            return Validator.isInRange(parseFloat(viewsCountString) * viewsCountMultiplier, range.minimum, range.maximum)
        })
        this._addItemComplianceFilter(
            FILTER_HD_VIDEOS, (item) => !Validator.isChildMissing(item, '.hd-thumbnail'),
        )
        this._addItemComplianceFilter(
            FILTER_PRO_CHANNEL_VIDEOS, (item) => Validator.isChildMissing(item, '.channel-icon'),
        )
        this._addItemComplianceFilter(
            FILTER_PAID_VIDEOS, (item) => Validator.isChildMissing(item, '.p2v-icon, .fanClubVideoWrapper'),
        )
        this._addItemComplianceFilter(
            FILTER_PREMIUM_VIDEOS, (item) => Validator.isChildMissing(item, '.marker-overlays > .premiumIcon'),
        )
        this._addItemComplianceFilter(
            FILTER_PRIVATE_VIDEOS, (item) => Validator.isChildMissing(item, '.privateOverlay'),
        )
        this._addItemComplianceFilter(
            FILTER_RECOMMENDED_VIDEOS, (item) => Validator.isChildMissing(item, '.recommendedFor'),
        )
        this._addSubscriptionsFilter({
            loader: {
                getPageCount: (page) => parseInt(page.children().first().text().replace(REGEX_PRESERVE_NUMBERS, '')),
                getPageUrl: (baseUrl, pageNo) => baseUrl + '?page=' + pageNo + ' .userWidgetWrapperGrid',
                subscriptionNameSelector: 'a.usernameLink',
                subscriptionsPageUrl: window.location.origin + $('#profileMenuDropdown > li.alpha > span > a').attr('href') + '/subscriptions',
                subsectionSelector: '.profileContentLeft .showingInfo',
            },
            filter: {
                exclusionsCallback: () => !IS_FEED_PAGE,
                getItemUsername:  (item) => {
                    let username = item.find('.usernameWrap a').text().trim()]
					
                    return (username === this._playlistPageUsername || username === this._profilePageUsername) ? false : username
                }
            }
        })
        this._addItemBlacklistFilter('H videos with specified phrases in their names. Separate the phrases with line breaks.')
    }

    /**
     * @private
     */
    _setupUI ()
    {
        this._onBeforeUIBuild = () => {
            this._removeIframes()

            if (IS_VIDEO_PAGE) {
                this._complyPaidVideosSectionOnVideoPage()
                this._removeLoadMoreButtons()
                Validator.sanitizeNodeOfSelector('.inlineFree', this._configurationManager.getFieldOrFail(FILTER_TEXT_SANITIZATION).optimized)
            } else {
                if (IS_VIDEO_SEARCH_PAGE) {
                    this._removePornStarSectionsFromSearchPage()
                    this._removePremiumSectionFromSearchPage()
                    this._fixLeftOverSpaceOnVideoSearchPage()
                    this._fixPaginationNavOnVideoSearchPage()
                } else {
                    if (IS_PROFILE_PAGE) {
                        this._removeVideoSectionsOnProfilePage()
                        this._profilePageUsername = PAGE_PATH_NAME.split('/')[1]
                    } else {
                        if (IS_PLAYLIST_PAGE) {
                            this._playlistPageUsername = $('#js-aboutPlaylistTabView .usernameWrap a').text().trim()
                        }
                    }
                }
            }

            this._removeLiveModelsSections()
        }

        this._onUIBuild = () =>
            this._uiGen.createSettingsSection().append([
                this._uiGen.createTabsSection(['Filters', 'Text', 'UI', 'Global', 'Stats'], [
                    this._uiGen.createTabPanel('Filters', true).append([
                        this._configurationManager.createElement(FILTER_DURATION_RANGE),
                        this._configurationManager.createElement(FILTER_PERCENTAGE_RATING_RANGE),
                        this._configurationManager.createElement(FILTER_VIDEOS_VIEWS),
                        this._uiGen.createBreakSeparator(),
                        this._configurationManager.createElement(FILTER_HD_VIDEOS),
                        this._configurationManager.createElement(FILTER_PAID_VIDEOS),
                        this._configurationManager.createElement(FILTER_PREMIUM_VIDEOS),
                        this._configurationManager.createElement(FILTER_PRIVATE_VIDEOS),
                        this._configurationManager.createElement(FILTER_PRO_CHANNEL_VIDEOS),
                        this._configurationManager.createElement(FILTER_RECOMMENDED_VIDEOS),
                        this._configurationManager.createElement(FILTER_SUBSCRIBED_VIDEOS),
                        this._configurationManager.createElement(FILTER_UNRATED),
                        this._configurationManager.createElement(FILTER_WATCHED_VIDEOS),
                        this._uiGen.createSeparator(),
                        this._configurationManager.createElement(OPTION_DISABLE_COMPLIANCE_VALIDATION),
                    ]),
                    this._uiGen.createTabPanel('Text').append([
                        this._configurationManager.createElement(FILTER_TEXT_SEARCH),
                        this._configurationManager.createElement(FILTER_TEXT_BLACKLIST),
                        this._configurationManager.createElement(FILTER_TEXT_WHITELIST),
                        this._configurationManager.createElement(FILTER_TEXT_SANITIZATION),
                    ]),
                    this._uiGen.createTabPanel('UI').append([
                        this._configurationManager.createElement(LINK_DISABLE_PLAYLIST_CONTROLS),
                        this._configurationManager.createElement(LINK_USER_PUBLIC_VIDEOS),
                        this._uiGen.createSeparator(),
                        this._configurationManager.createElement(UI_REMOVE_IFRAMES),
                        this._configurationManager.createElement(UI_REMOVE_LIVE_MODELS_SECTIONS),
                        this._configurationManager.createElement(UI_REMOVE_PORN_STAR_SECTIONS),
                        this._uiGen.createSeparator(),
                        this._configurationManager.createElement(OPTION_ALWAYS_SHOW_SETTINGS_PANE),
                    ]),
                    this._uiGen.createTabPanel('Global').append([
                        this._uiGen.createFormSection('Account').append([
                            this._createSubscriptionLoaderControls(),
                        ]),
                        this._uiGen.createSeparator(),
                        this._createSettingsBackupRestoreFormActions(),
                    ]),
                    this._uiGen.createTabPanel('Stats').append([
                        this._uiGen.createStatisticsFormGroup(FILTER_TEXT_BLACKLIST),
                        this._uiGen.createStatisticsFormGroup(FILTER_TEXT_WHITELIST),
                        this._uiGen.createStatisticsFormGroup(FILTER_DURATION_RANGE),
                        this._uiGen.createStatisticsFormGroup(FILTER_HD_VIDEOS, 'High Definition'),
                        this._uiGen.createStatisticsFormGroup(FILTER_TEXT_SEARCH),
                        this._uiGen.createStatisticsFormGroup(FILTER_PAID_VIDEOS, 'Paid Videos'),
                        this._uiGen.createStatisticsFormGroup(FILTER_PREMIUM_VIDEOS, 'Premium Videos'),
                        this._uiGen.createStatisticsFormGroup(FILTER_PRIVATE_VIDEOS, 'Private Videos'),
                        this._uiGen.createStatisticsFormGroup(FILTER_PRO_CHANNEL_VIDEOS, 'Pro Channel Videos'),
                        this._uiGen.createStatisticsFormGroup(FILTER_PERCENTAGE_RATING_RANGE),
                        this._uiGen.createStatisticsFormGroup(FILTER_RECOMMENDED_VIDEOS, 'Recommended'),
                        this._uiGen.createStatisticsFormGroup(FILTER_SUBSCRIBED_VIDEOS, 'Subscribed'),
                        this._uiGen.createStatisticsFormGroup(FILTER_UNRATED, 'Unrated'),
                        this._uiGen.createStatisticsFormGroup(FILTER_VIDEOS_VIEWS),
                        this._uiGen.createStatisticsFormGroup(FILTER_WATCHED_VIDEOS, 'Watched'),
                        this._uiGen.createSeparator(),
                        this._uiGen.createStatisticsTotalsGroup(),
                    ]),
                ]),
                this._createSettingsFormActions(),
                this._uiGen.createSeparator(),
                this._uiGen.createStatusSection(),
            ])

        this._onAfterUIBuild = () => {
            this._complyProfileLinks()
            this._uiGen.getSelectedSection()[0].userScript = this
        }
    }

    /**
     * Validate and change playlist video links
     * @param {JQuery} videoItem
     * @private
     */
    _validatePlaylistVideoLink (videoItem)
    {
        if (this._configurationManager.getValue(LINK_DISABLE_PLAYLIST_CONTROLS)) {
            videoItem.find('a.linkVideoThumb, span.title a').each((index, playlistLink) => {
                playlistLink = $(playlistLink)
                playlistLink.attr('href', playlistLink.attr('href').replace(/&pkey.*/, ''))
            })
        }
    }
}

(new PHSearchAndUITweaks).init()