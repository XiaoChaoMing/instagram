import strData from "./db_json/story.json" assert { type: "json" };
import postData from "./db_json/post.json" assert { type: "json" };
import postEmoji from "./db_json/emoji.json" assert { type: "json" };
const App = {
  // dung angular js
  renderUI: function () {
    let postImgList;
    let indexList;
    const btnPost = `<div class="btn-nextPost btn-post"></div>
    <div class="btn-prevPost btn-post"></div>`;
    const strList = strData.map((item) => {
      return `<div class="story">
      <div class="str-Useravt">
        <img
          height="54"
          width="54"
          src="${item.imgPath}"
          alt=""
        />
      </div>
      <div class="str-userName">${item.username}</div>
    </div>`;
    });
    $(".story-wraper").html(strList.join(""));

    // render post
    const postLists = postData.map((item) => {
      postImgList = item.postImage.map((img) => {
        if (img.includes(".mp4")) {
          return `
          <li class="post-content  ">
          <video
          loop="true"
          autoplay="autoplay"
          playsinline
          muted
          width="75%"
        >
          <source
            src="${img}"
            type=""
          />
        </video>
       
        <div class="speaker-wraper">
        <svg aria-label="Audo is muted." class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="12" role="img" viewBox="0 0 48 48" width="12"><title>Audo is muted.</title><path clip-rule="evenodd" d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z" fill-rule="evenodd"></path></svg>
        </div>
        </li>
          `;
        } else {
          return `<li class="post-content  ">
          <img src="${img}" alt="" />
        </li>`;
        }
      });
      if (item.postImage.length > 1) {
        indexList = item.postImage.map((img, index) => {
          if (index === 0) {
            return `<span class="activeImg"></span>`;
          } else {
            return `<span></span>`;
          }
        });
      } else {
        indexList = [];
      }

      return `
      <div class="maint-post">
      <div class="post-info">
        <div class="post-avt">
          <img
            height="32"
            width="32"
            src="${item.postAvt}"
            alt=""
          />
        </div>
        <div class="post-username">${item.postUsername}</div>
        <span>•</span>
        <div class="post-time">${item.postTime}</div>
      </div>
      <div class="post-slideshow">
        ${item.postImage.length > 1 ? btnPost : ""}
        <div class="btn-indexPost">
        ${indexList.join("")}
        </div>
        <ul class="slider-wrap">
          ${postImgList.join("")}
        </ul>
      </div>
      <div class="interact-wraper">
        <div class="interact-items">
          <div class="interact-icons">
            <div class="like">
              <svg
                aria-label="Like"
                class="x1lliihq x1n2onr6"
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Like</title>
                <path
                  d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                ></path>
              </svg>
            </div>
            <div class="comments">
              <svg
                aria-label="Comment"
                class="x1lliihq x1n2onr6"
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Comment</title>
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
          </div>
          <div class="save">
            <svg
              aria-label="Save"
              class="x1lliihq x1n2onr6"
              color="rgb(245, 245, 245)"
              fill="rgb(245, 245, 245)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Save</title>
              <polygon
                fill="none"
                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></polygon>
            </svg>
          </div>
        </div>
        <div class="post-like">
          <span>${item.postLike}</span>
          <span>likes</span>
        </div>
        <div class="post-status">
          <span class="post-username">nhat_minh149</span>
          <p>hiphopNVD</p>
        </div>
        <div class="comments-wraper">
          <div class="show-comments">
            View all
            <span class="total-comments">${item.postTotalComment}</span>
            comment
          </div>
          <div class="add-comment">
            <input type="text" name="" id="" placeholder="Add a comment..." />
            <div class="emoji">
            <i class="ri-emotion-line"></i>
            <div class="emoji-picker">
              <ul class="emo-wraper">
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    });
    $(".posts-container").html(postLists.join(""));
    //render emoji
    const emoList = postEmoji.map((emoji) => {
      return `<li class="emo" style="font-size:32px">${emoji.emoji}</li>`;
    });
    $(".emo-wraper").append(emoList.join(""));
  },
  RenderCommentModal: function (postItem) {
    //render comment
    let postImgList;
    let indexList;
    const btnPost = `<div class="btn-nextPost btn-post"></div>
    <div class="btn-prevPost btn-post"></div>`;
    const post = () => {
      postImgList = postItem.postImage.map((img) => {
        if (postItem.postImage.length > 1) {
          indexList = postItem.postImage.map((img, index) => {
            if (index === 0) {
              return `<span class="activeImg"></span>`;
            } else {
              return `<span></span>`;
            }
          });
        } else {
          indexList = [];
        }
        if (img.includes(".mp4")) {
          return `
          <li class="md_post-content">
                <video  style="max-height: 700px;" loop="true" autoplay="autoplay" playsinline="" muted="" width="75%">
                <source src="${img}" type="">
              </video>
             
              <div class="speaker-wraper">
                <svg aria-label="Audio is playing" class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="12" role="img" viewBox="0 0 24 24" width="12">
                  <title>Audio is playing</title>
                  <path d="M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"></path>
                </svg>
              </div>
              </li>
        `;
        } else {
          return `
          <li class="md_post-content">
                <img style="max-height:700px" src="${img}" alt="">
              </li>
          `;
        }
      });
      return `
      <div class="comment-modal">
          <div class="postSlide-modal">
          ${postItem.postImage.length > 1 ? btnPost : ""}
          <div class="btn-indexPost">
        ${indexList.join("")}
        </div>
            <ul class="md_maint-post">
              ${postImgList.join("")}
            </ul>
          </div>
          <div class="md_interact-wraper">
            <div class="md_interact-header">
              <div class="md_interact-hd-wraper">
                <div class="post-avt">
                  <img
                    height="32"
                    width="32"
                    src="./src/images/avatar/278822746_1648530392213148_8157179013739528613_n.jpg"
                    alt=""
                  />
                </div>
                <div class="post-username">minh_nguyen149</div>
              </div>
              <div class="md_post-status">
                hiphopNVD
              </div>
            
            </div>
            <div class="md_interact-comment">
              <div class="md_comment">
                <div class="md_comment-wraper">
                  <div class="i4-comment">
                    <div class="comment-avt">
                      <img height="32" width="32" src="./src/images/avatar/278822746_1648530392213148_8157179013739528613_n.jpg" alt="">
                    </div>
                    <div class="i4-name">minh_nhat1489</div>
                  </div>
                  <div class="md-maint-comment">
                    <p>ngon vl</p>
                  </div>
                </div>
                <div class="md-comment-likes">
                  <svg aria-label="Like" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                </div>
              </div>
            </div>
            <div class="md_other-interact">
              <div class="interact-items">
                <div class="interact-icons">
                  <div class="like">
                    <svg aria-label="Like" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                      <title>Like</title>
                      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                    </svg>
                  </div>
                  <div class="comments">
                    <svg aria-label="Comment" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                      <title>Comment</title>
                      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                  </div>
                </div>
                <div class="save">
                  <svg aria-label="Save" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <title>Save</title>
                    <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                  </svg>
                </div>
              </div>
              <div class="md-total-like">
                <span>1000</span>
                <span>likes</span>
              </div>
            </div>
            <div class="md_add-comment">
              <div class="add-comment">
                <i class="ri-emotion-line"></i>
                <input type="text" name="" id="" placeholder="Add a comment..." />
                <div class="btn-cf-comment">post</div>
              </div>
            </div>
          </div>
        </div>
      `;
    };
    $(".comment-overlay").append(post);
    App.handleScrollPost();
  },
  handleSearch: function () {
    if ($(".item-search").hasClass("blue")) {
      $(".maint-logo").html(`<svg
      aria-label="Instagram"
      class="_ab6-"
      color="rgb(245, 245, 245)"
      fill="rgb(245, 245, 245)"
      height="29"
      role="img"
      viewBox="32 4 113 32"
      width="103"
    >
      <path
        clip-rule="evenodd"
        d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>`);
      $(".Search-overlay").animate({ left: "-100%" });
      $(".Sidebar").animate({ width: "209.2px" }).css("min-width", "250px");
      $(".item").animate({ width: "209.2px" });
      $("div.item >a> span").show();
      $(".item-search").css("border", "none");
    } else {
      $(".maint-logo").html(`<i class="ri-instagram-line ri-lg"></i>`);
      $(".Search-overlay").animate({ left: "0" });
      $(".Sidebar").animate({ width: "40px" }).css("min-width", "80px");
      $(".item").animate({ width: "40px" });
      $("div.item >a> span").hide();
      $(".item-search").css("border", "1px solid white");
    }
  },
  handleNotify: function () {
    if ($(".item-Noti").hasClass("blue")) {
      $(".maint-logo").html(`<svg
      aria-label="Instagram"
      class="_ab6-"
      color="rgb(245, 245, 245)"
      fill="rgb(245, 245, 245)"
      height="29"
      role="img"
      viewBox="32 4 113 32"
      width="103"
    >
      <path
        clip-rule="evenodd"
        d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>`);
      $(".Notify-overlay").animate({ left: "-100%" });
      $(".Sidebar").animate({ width: "209.2px" }).css("min-width", "250px");
      $(".item").animate({ width: "209.2px" });
      $("div.item >a> span").show();
      $(".item-Noti").css("border", "none");
    } else {
      $(".maint-logo").html(`<i class="ri-instagram-line ri-lg"></i>`);
      $(".Notify-overlay").animate({ left: "0" });
      $(".Sidebar").animate({ width: "40px" }).css("min-width", "80px");
      $(".item").animate({ width: "40px" });
      $("div.item >a> span").hide();
      $(".item-Noti").css("border", "1px solid white");
    }
  },
  toggleCreatePost: function () {
    if ($(".item-search").hasClass("blue")) {
      $(".create_post-overlay").hide();
    } else {
      $(".create_post-overlay").show();
    }
  },
  handlePostCreated: function () {
    const stepTracking = 0;
    const width = 570;
    $(".input-file").on("change", (e) => {
      $(".crph").show();
      const fileList = [];
      for (var i = 0; i < e.target.files.length; i++) {
        fileList.push(e.target.files[i]);
      }
      const postItems = Promise.all(
        fileList.map((item) => {
          console.log(item);
          return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onloadend = function () {
              if (item.name.includes(".mp4")) {
                resolve(`<div class="imgWraper">
                <video autoplay replay width="100%" height="100%" src="${reader.result}"></video>
                </div>`);
              }
              resolve(`
            <div class="imgWraper">
            <img width="100%" height="100%" src="${reader.result}"/>
            </div>
            `);
            };
            reader.onerror = reject;
            reader.readAsDataURL(item);
          });
        })
      )
        .then((results) => {
          $(".crpContainer").html(results);
          $(".crpControll").show();
          $(".crpWraper").show();
          $(".create-post").hide();
          $(".create-status").show();
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const scroll = (width) => {
      $(".crpWraper").animate({ scrollLeft: "+=" + width });
    };
    $(".crpbtn").on("click", (el) => {
      $(el.currentTarget).is(".btn-next") ? scroll(width) : scroll(-width);
    });
    $(".crph").on("click", (el) => {});
  },
  handleScrollStr: function () {
    const width = $(".story-wraper").width();
    const scroll = (width) => {
      $(".story-wraper").animate({ scrollLeft: "+=" + width }, 1000);
    };
    $("div.btnStr").on("click", (el) => {
      $(el.currentTarget).is(".btn-nextStr") ? scroll(width) : scroll(-width);
    });
  },
  handleImageUDPRF: function () {
    $(".input-avt").on("change", (e) => {
      var reader = new FileReader();

      reader.onload = function (e) {
        document.querySelector(".avtWrapper img").src = e.target.result;
      };

      reader.readAsDataURL(this.files[0]);
    });
  },
  // khong can su dung
  handleScrollPost: function () {
    var imgIndex = 0;
    let touchStartX = null;
    var deltaX = 0;
    const currentIdx = (x) => {
      imgIndex += x;
    };
    // $(".btn-prevPost").hide();
    const toggleBtn = (maintpost) => {
      const postlenght = maintpost.children(".slider-wrap").children().length;
      imgIndex > 0
        ? maintpost.children(".btn-prevPost").show()
        : maintpost.children(".btn-prevPost").hide();
      imgIndex === postlenght - 1
        ? maintpost.children(".btn-nextPost").hide()
        : maintpost.children(".btn-nextPost").show();
    };

    const scroll = (width, maintpost) => {
      $(maintpost)
        .children("ul")
        .animate({ scrollLeft: "+=" + width + "px" }, 500);
    };
    $(".slider-wrap").on("touchstart", (event) => {
      $(".slider-wrap").addClass("toggleSwip");
      touchStartX = event.touches[0].clientX;
    });
    $(".slider-wrap").on("touchmove", (event) => {
      $(".slider-wrap").addClass("toggleSwip");
      if (!touchStartX) return;
      let touchMoveX = event.touches[0].clientX;
      deltaX = touchMoveX - touchStartX;
    });
    $(".slider-wrap").on("touchend", () => {
      setTimeout(() => {
        $(".slider-wrap").removeClass("toggleSwip");
      }, 500);
      if (deltaX > 0) {
        if (imgIndex !== 0) {
          $(`.btn-indexPost span:eq(${imgIndex})`).removeClass("activeImg");
          currentIdx(-1);
          $(`.btn-indexPost span:eq(${imgIndex})`).addClass("activeImg");
        }
      } else if (deltaX < 0) {
        if (imgIndex !== $(`.btn-indexPost span`).length - 1) {
          $(`.btn-indexPost span:eq(${imgIndex})`).removeClass("activeImg");
          currentIdx(+1);
          $(`.btn-indexPost span:eq(${imgIndex})`).addClass("activeImg");
        }
      }
      touchStartX = null;
      deltaX = 0;
      imgIndex > 0 ? $(".btn-prevPost").show() : $(".btn-prevPost").hide();
      imgIndex === $(`.btn-indexPost span`).length - 1
        ? $(".btn-nextPost").hide()
        : $(".btn-nextPost").show();
    });
    $("div.btn-post").on("click", (el) => {
      const maintpost = $(el.currentTarget).parent();
      const width = maintpost.children("ul").width();
      const target = maintpost.find(".btn-indexPost").children(".activeImg");
      if ($(el.currentTarget).is(".btn-nextPost")) {
        if (target.next().is(":empty")) {
          target.toggleClass("activeImg");
        }
        target.next().toggleClass("activeImg");
      } else {
        if (target.prev().is(":empty")) {
          target.toggleClass("activeImg");
        }
        target.prev().toggleClass("activeImg");
      }
      $(el.currentTarget).is(".btn-nextPost")
        ? scroll(width, maintpost)
        : scroll(-width, maintpost);
    });
  },
  handleShowComment: function () {
    $("div.show-comments").each(function (index) {
      $(this).on("click", () => {
        App.RenderCommentModal(postData[index]);
        $(".comment-overlay").show();
      });
    });
  },
  handleMenu: function () {
    $("div.item").each(function (index) {
      $(this).on("click", () => {
        if (index === 1) {
          App.handleSearch();
          $(this).toggleClass("blue");
        } else if (index === 6) {
          App.toggleCreatePost();
          $(this).toggleClass("blue");
        } else if (index === 5) {
          App.handleNotify();
          $(this).toggleClass("blue");
        }
      });
    });
    $(".btn-close_OvPost").on("click", () => {
      $(".create_post-overlay").hide();
      $(".create-post").show();
      $(".crpWraper").hide();
      $(".create-status").hide();
      $(".crph").hide();
    });
    $(".btn-close_comment").on("click", () => {
      $(".comment-overlay").hide();
    });

    $(".emoji").on("click", (el) => {
      $(el.currentTarget).children(".emoji-picker").toggle();
    });
    $(".emoji-picker")
      .children()
      .on("click", (e) => {
        e.stopPropagation();
      });
    $(".speaker-wraper").each((idx, spk) => {
      $(spk).on("click", (el) => {
        const r = $(el.currentTarget).parent().children("video");
        if (r.prop("muted", true) && $(this).attr("data-click-state") == 1) {
          $(this).attr("data-click-state", 0);
          $(el.currentTarget).html(
            '<svg aria-label="Audio is playing" class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Audio is playing</title><path d="M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"></path></svg>'
          );
          r.prop("muted", false);
        } else {
          $(this).attr("data-click-state", 1);
          r.prop("muted", true);
          $(el.currentTarget).html(
            '<svg aria-label="Audo is muted." class="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="12" role="img" viewBox="0 0 48 48" width="12"><title>Audo is muted.</title><path clip-rule="evenodd" d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z" fill-rule="evenodd"></path></svg>'
          );
        }
      });
    });
  },
  handleEmoPiker: function () {
    $(".emo").each((el, item) => {
      $(item).on("click", (e) => {
        const r = $(e.currentTarget).parents(".add-comment");
        $(r)
          .children("input")
          .val($(r).children("input").val() + e.currentTarget.innerText);
      });
    });
  },
  handleEditProfile: function () {},

  Start: function () {
    this.renderUI();
    this.handleMenu();
    this.handleScrollStr();
    this.handleScrollPost();
    this.handleShowComment();
    this.handleEmoPiker();
    this.handlePostCreated();
    this.handleImageUDPRF();
  },
};
App.Start();
