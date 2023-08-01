import type { URLCard, URLCardsSettings } from "#/services/urlcards/mod.ts";
import { AllowList } from "#/services/urlcards/urlcards.ts";
import { ADMIN_TOKEN } from "#/env.ts";

/**
 * URLCardsAdminPageProps are the props for the URLCardsAdminPage component.
 */
export interface URLCardsAdminPageProps {
  cards: URLCard[];
  settings?: URLCardsSettings;
}

/**
 * URLCardsAdminPage is the component for the URLCardsAdminPage page.
 */
export default function URLCardsAdminPage(props: URLCardsAdminPageProps) {
  return (
    <div class="urlcards-admin-page">
      <h1 class="urlcards-admin-title">
        {props.settings?.title || "URLCards"} Admin
      </h1>
      <CreateURLCardForm allowList={props.settings?.allowList} />
      <CreateURLCardList data={props.cards} />
      <EditSettingsForm data={props.settings} />
    </div>
  );
}

/**
 * CreateURLCardListProps are the props for the CreateURLCardList component.
 */
interface CreateURLCardListProps {
  data: URLCard[];
}

/**
 * CreateURLCardList is the list of stored URLCard items. Each item has a
 * delete button pointed at `/:admin_token/cards/:card_id/delete`.
 */
function CreateURLCardList(props: CreateURLCardListProps) {
  return (
    <ul class="urlcards-admin-list">
      {props.data.map((card) => (
        <li class="urlcards-admin-list-item">
          <form
            action={`/${ADMIN_TOKEN}/cards/${card.id}/delete`}
            method="POST"
            class="urlcards-admin-delete-form"
          >
            <fieldset>
              <legend>
                <a href={card.url}>{card.title}</a>
              </legend>
              <input type="hidden" name="id" value={card.id} />
              <button type="submit">Delete</button>
            </fieldset>
          </form>
        </li>
      ))}
    </ul>
  );
}

/**
 * CreateURLCardForm is the form for creating a new URLCard.
 */
interface CreateURLCardFormProps {
  allowList?: AllowList;
}

/**
 * CreateURLCardForm is the form for creating a new URLCard.
 */
function CreateURLCardForm(props: CreateURLCardFormProps) {
  return (
    <form class="urlcards-admin-create-form" action={`/${ADMIN_TOKEN}/cards`}>
      <fieldset>
        <legend>Create URLCard</legend>

        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="Title"
            class="urlcards-admin-create-title"
          />
        </label>

        {props.allowList && props.allowList.length > 0
          ? (
            <label>
              Select URL from Allow List:
              <select name="url" class="urlcards-admin-create-url">
                {props.allowList.map(({ name, url }) => (
                  <option value={url}>{name}</option>
                ))}
              </select>
            </label>
          )
          : (
            <label>
              URL:
              <input
                type="text"
                name="url"
                placeholder="URL"
                class="urlcards-admin-create-url"
              />
            </label>
          )}

        <label>
          Picture File:
          <input
            type="file"
            name="picture_file"
            placeholder="Picture file"
            class="urlcards-admin-create-picture-file"
          />
        </label>

        <button type="submit" class="urlcards-admin-create-submit">
          Create
        </button>
      </fieldset>
    </form>
  );
}

/**
 * EditSettingsFormProps are the props for the EditSettingsForm component.
 */
interface EditSettingsFormProps {
  data?: URLCardsSettings;
}

/**
 * EditSettingsForm is the form for editing the settings.
 */
function EditSettingsForm(props: EditSettingsFormProps) {
  return (
    <>
      <form
        action={`/${ADMIN_TOKEN}/settings/title`}
        method="POST"
        class="urlcards-admin-title-form"
      >
        <fieldset>
          <legend>Edit title</legend>
          <label>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={props.data?.title}
            />
          </label>
          <button type="submit">Edit</button>
        </fieldset>
      </form>
      <form
        action={`/${ADMIN_TOKEN}/settings/background`}
        method="POST"
        class="urlcards-admin-background-form"
      >
        <fieldset>
          <legend>Edit background</legend>
          <label>
            Background:
            <input
              type="text"
              name="background"
              placeholder="Background"
              value={props.data?.background}
            />
          </label>
          <button type="submit">Edit</button>
        </fieldset>
      </form>
      <form
        action={`/${ADMIN_TOKEN}/settings/logo`}
        method="POST"
        class="urlcards-admin-logo-form"
      >
        <fieldset>
          <legend>Edit logo</legend>
          <label>
            Logo File:
            <input type="file" name="logo_file" placeholder="Logo file" />
          </label>
          <button type="submit">Edit</button>
        </fieldset>
      </form>
      <EditAllowListForm data={props.data?.allowList} />
    </>
  );
}

/**
 * EditAllowListFormProps are the props for the EditAllowListForm component.
 */
interface EditAllowListFormProps {
  data?: AllowList;
}

/**
 * EditAllowListFormProps are the props for the EditAllowListForm component.
 */
function EditAllowListForm(props: EditAllowListFormProps) {
  return (
    <>
      <form
        action={`/${ADMIN_TOKEN}/allow_list`}
        method="POST"
        class="urlcards-admin-allow-form"
      >
        <fieldset>
          <legend>Add allowed URL</legend>
          <label>
            Name:
            <input type="text" name="name" placeholder="Name" />
          </label>
          <label>
            URL:
            <input type="text" name="url" placeholder="URL" />
          </label>
          <button type="submit">Add</button>
        </fieldset>
      </form>
      <ul class="urlcards-admin-allow-list">
        {props.data?.map(({ name, url }) => (
          <li class="urlcards-admin-allow-list-item">
            <form
              action={`/${ADMIN_TOKEN}/allow_list/${name}/delete`}
              method="POST"
              class="urlcards-admin-allow-delete-form"
            >
              <fieldset>
                <legend>
                  <a href={url}>{name}</a>
                </legend>
                <input type="hidden" name="name" value={name} />
                <button type="submit">Delete</button>
              </fieldset>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
